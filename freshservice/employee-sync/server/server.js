// ----------------------------------------------
// Custom objects
// ----------------------------------------------

const ValidEmployeeTypesEnum = {
  "Full Time": 1,
  "Part Time": 2,
  Contract: 3,
  Internship: 4,
  Temporary: 5,
  Seasonal: 6,
  Voluntary: 7,
};

function employeeType(rawValue) {
  // Convert to title case first because API response contains lowercase underscore-separated values
  const value = rawValue
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return ValidEmployeeTypesEnum[value] ? value : "Other";
}

async function setEmployeeRecords(records) {
  const entity = $db.entity({ version: "v1" });
  const employees = entity.get("employees");
  const now = (new Date()).toISOString();
  let counter = 0;
  for (const r of records) {
    const res = await employees.create({
      id: r.id,
      employee_id: r.employee_id,
      employee_type: employeeType(r.employee_type),
      official_email: r.official_email,
      terminated: r.terminated,
      designation: r.designation,
      department: r.department_id?.toString(),
      first_name: r.first_name,
      last_name: r.last_name,
      synced_at: now,
    });
    counter++;
    console.log(res);
  }
  return counter;
}

// ----------------------------------------------
// Sync
// ----------------------------------------------
function setSyncState(headers, currentPage) {
  const state = {
    perPage: parseInt(headers["per-page"]),
    totalObjects: parseInt(headers["total-objects"]),
    totalPages: parseInt(headers["total-pages"]),
    currentPage,
  };
  try {
    // Update sync pagination
    return $db.update("sync_state", "set", state);
  } catch (err) {
    // If update fails, try setting the value.
    console.log(`Error setting sync pagination in $db: ${err.message}`);
    return $db.set("sync_state", state);
  }
}

async function getSyncState() {
  try {
    return await $db.get("sync_state");
  } catch (err) {
    console.log(`Error getting sync pagination state: ${err.message}`);
    return {
      perPage: 0,
      totalObjects: 0,
      totalPages: 0,
      currentPage: 0,
    };
  }
}

async function getEmployees(page = 1) {
  // Prepare URL and headers
  const url = `<%= iparam.$freshteam_domain.url %>/api/employees?page=${page}&sort=employee_id&sort_type=asc`;
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer <%= iparam.freshteam_api_key %>",
  };
  // Send request
  const res = await $request.get(url, {
    headers,
    maxAttempts: 3,
    retryDelay: 1000,
  });
  // Update sync pagination state if response was successful
  if (res.status === 200 || res.status === 201) {
    await setSyncState(res.headers, page);
  }
  // Return response body
  return JSON.parse(res.response);
}

async function syncRecords() {
  const state = await getSyncState();
  let currentPage;
  console.log(state);

  // Handle pagination
  if (state.totalPages > 0 && state.totalPages === state.currentPage) {
    // Restart sync from first page if all pages have been synced
    // TODO: improve logic
    console.log(`[Sync] Sync has reached last page. Starting from page 1.`);
    currentPage = 1;
  } else {
    // If more pages exist, then continue with paginated query by fetching the next page
    currentPage = state.currentPage + 1;
    console.log(`[Sync] Syncing page ${currentPage}`);
  }

  const res = await getEmployees(currentPage);
  if (Array.isArray(res) && res.length > 0) {
    await setEmployeeRecords(res);
  }
}

// ----------------------------------------------
// Schedule
// ----------------------------------------------

function createSchedule() {
  // Create a schedule to run every 5 minutes, starting 5 minutes from app install
  return $schedule.create({
    name: "freshteam_employee_sync",
    data: {},
    schedule_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes in the future
    repeat: {
      time_unit: "minutes",
      frequency: 5,
    },
  });
}

// ----------------------------------------------
// Event handlers
// ----------------------------------------------

exports = {
  /**
   * Handler invoked with `onAppInstall` event. Creates scheduled function to run every 30 minutes.
   */
  async onAppInstall() {
    try {
      await createSchedule();
    } catch (err) {
      console.log(`Error creating schedule: ${err.message}`);
      renderData(err); // Prevent install completion if creating schedule fails
    }
    // All good, let app install reach completion
    renderData();
  },

  /**
   * Handler invoked `onScheduledEvent`
   * @param {object} args
   */
  async onScheduledEvent() {
    try {
      await syncRecords();
    } catch (err) {
      console.log(`Error syncing records: ${err.message}`);
    }
  },
};

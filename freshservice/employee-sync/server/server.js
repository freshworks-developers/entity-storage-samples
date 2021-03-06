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

/**
 * Save sync history
 *
 * @param {string} start - Date string in ISO format
 * @param {string} end - Date string in ISO format
 * @param {number} num - Number of items synced
 * @param {string} domain - The Freshteam domain
 */
async function saveSyncHistory(start, end, num, domain) {
  const entity = $db.entity({ version: "v1" });
  const syncHistory = entity.get("sync_history");
  try {
    await syncHistory.create({
      sync_start: start,
      sync_end: end,
      num_synced_records: num,
      domain,
    });
  } catch (err) {
    console.log(
      `[Custom Objects] Unable to create sync history record. Reason: ${err.message}`
    );
  }
}

/**
 * Save employee objects received from the REST API to Custom Objects store
 *
 * @param {Array<object>} records - An array of Employee objects
 * @param {Array<object>} branches - An array of Branch objects
 * @param {Array<object>} departments - An array of Department objects
 * @param {string} synced_at - Synced at timestamp as ISO formatted Date string
 * @returns {number} - Number of records saved in the custom objects data store
 */
async function saveEmployeeRecords(records, branches, departments, synced_at) {
  const entity = $db.entity({ version: "v1" });
  const employees = entity.get("employees");
  let counter = 0;
  // Iterate over records received and try to create an entity record for each
  for (const r of records) {
    // Prepare entities data payload
    const data = {
      internal_id: r.id,
      employee_id: r.employee_id,
      employee_type: employeeType(r.employee_type),
      official_email: r.official_email,
      terminated: r.terminated,
      designation: r.designation,
      first_name: r.first_name,
      last_name: r.last_name,
      synced_at,
    };
    // Filter out branch information
    const branch = branches.find((b) => b.id === r.branch_id);
    if (branch) {
      data.branch_name = branch.name;
      data.branch_main_office = branch.main_office;
      data.branch_city = branch.city;
      data.branch_country = branch.country_code;
    }
    // Filter out department information
    const department = departments.find((d) => d.id === r.department_id);
    if (department) {
      data.department = department.name;
    }
    try {
      // See if the record exists
      const displayId = await getSyncMap(r.id);

      if (displayId !== null) {
        // If record exists, update the entry
        await employees.update(displayId, data);
      } else {
        // If record does not exist, create a new entry
        const res = await employees.create(data);

        // Update the sync map to map between employee internal id and custm objects display id
        await setSyncMap(r.id, res.record.display_id);
      }
      // Increment the counter
      counter++;
    } catch (err) {
      console.log(
        `[Custom Objects] Unable to create employee record for id ${r.id}. Reason: ${err.message}`
      );
    }
  }
  return counter;
}

// ----------------------------------------------
// Sync
// ----------------------------------------------
async function setSyncMap(id, displayId) {
  try {
    await $db.set(`sync_map:${id}`, { displayId });
  } catch (err) {
    console.log(
      `[Sync] Error setting display_id for employee id ${id}. Reason: ${err.message}`
    );
  }
}

async function getSyncMap(id) {
  try {
    const res = await $db.get(`sync_map:${id}`);
    return res.displayId;
  } catch (err) {
    if (err.status && err.status === 404) {
      console.log(`[Sync] No existing record found for employee id ${id}`);
    } else {
      console.log(
        `[Sync] Error getting display_id for employee id ${id}. Reason: ${err.message}`
      );
    }
    return null;
  }
}

function setSyncPaginationState(headers, currentPage) {
  const state = {
    perPage: parseInt(headers["per-page"]),
    totalObjects: parseInt(headers["total-objects"]),
    totalPages: parseInt(headers["total-pages"]),
    currentPage,
  };
  try {
    // Update sync pagination
    return $db.update("sync_pagination_state", "set", state);
  } catch (err) {
    // If update fails, try setting the value.
    console.log(`Error setting sync pagination in $db: ${err.message}`);
    return $db.set("sync_pagination_state", state);
  }
}

async function getSyncPaginationState() {
  try {
    return await $db.get("sync_pagination_state");
  } catch (err) {
    if (err.status && err.status === 404) {
      console.log(
        `Sync state doesn't exist yet, possible first run: ${err.message}`
      );
    } else {
      console.log(`Error getting sync pagination state: ${err.message}`);
    }
    return {
      perPage: 0,
      totalObjects: 0,
      totalPages: 0,
      currentPage: 0,
    };
  }
}

// ----------------------------------------------
// REST API calls
// ----------------------------------------------

/**
 * Fetch records from Freshteam REST APIs "List all Employees" endpoint
 *
 * @param {number} page - Pagination page number
 * @returns {Array<object>} - Returns an array of employee objects
 */
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
    await setSyncPaginationState(res.headers, page);
  }
  // Return response body
  return JSON.parse(res.response);
}

/**
 * Fetch records from Freshteam REST APIs "List all Branches" endpoint
 *
 * @param {number} page - Pagination page number
 * @returns {Array<object>} - Returns an array of branch objects
 */
async function getBranches(page = 1) {
  let branches = [];
  // Prepare URL and headers
  const url = `<%= iparam.$freshteam_domain.url %>/api/branches?page=${page}`;
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
  branches = branches.concat(JSON.parse(res.response));
  const totalPages = res.headers["total-pages"]
    ? parseInt(res.headers["total-pages"])
    : 1;

  // If response is successfull, and more pages exist, paginate the response by recursively calling the function.
  // WARNING: Do better state mangement in production instead of recursively calling the function.
  // WARNING: This will work only if the list of branches is small enough to not hit API rate limits or execution timeouts.
  if ((res.status === 200 || res.status === 201) && totalPages > page) {
    branches = branches.concat(await getBranches(page + 1));
  }

  // Return response body
  return branches;
}

/**
 * Fetch records from Freshteam REST APIs "List all Departments" endpoint
 *
 * @param {number} page - Pagination page number
 * @returns {Array<object>} - Returns an array of branch objects
 */
async function getDepartments(page = 1) {
  let departments = [];
  // Prepare URL and headers
  const url = `<%= iparam.$freshteam_domain.url %>/api/departments?page=${page}`;
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
  departments = departments.concat(JSON.parse(res.response));
  const totalPages = res.headers["total-pages"]
    ? parseInt(res.headers["total-pages"])
    : 1;

  // If response is successfull, and more pages exist, paginate the response by recursively calling the function.
  // WARNING: Do better state mangement in production instead of recursively calling the function.
  // WARNING: This will work only if the list of branches is small enough to not hit API rate limits or execution timeouts.
  if ((res.status === 200 || res.status === 201) && totalPages > page) {
    departments = departments.concat(await getDepartments(page + 1));
  }

  // Return response body
  return departments;
}

// ----------------------------------------------
// Main business logic
// ----------------------------------------------

/**
 * Handles logic for syncing records from the Freshteam REST API following pagination requirements
 * and persisting the results in custom objects data store
 *
 * @param {string} domain - The Freshteam domain used to sync records
 */
async function syncRecords(domain) {
  const startTime = new Date().toISOString();
  const state = await getSyncPaginationState();
  let currentPage;

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

  // Call the REST API to get branches list
  const branches = await getBranches();
  // Call the REST API to get departments list
  const departments = await getDepartments();
  // Call the REST API to get employees list
  const res = await getEmployees(currentPage);
  // If there are results, then save them
  if (Array.isArray(res) && res.length > 0) {
    // Update custom objects store
    const counter = await saveEmployeeRecords(
      res,
      branches,
      departments,
      startTime
    );
    // Prepare endtime and save sync history record
    const endTime = new Date().toISOString();
    await saveSyncHistory(startTime, endTime, counter, domain);
  }
}

// ----------------------------------------------
// Scheduler
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
  async onScheduledEvent(args) {
    try {
      const domain = `${args.iparams.freshteam_domain}.freshteam.com`;
      await syncRecords(domain);
    } catch (err) {
      console.log(`Error syncing records: ${err.message}`);
    }
  },
};

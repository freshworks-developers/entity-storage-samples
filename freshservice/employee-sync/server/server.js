const { Freshteam } = require("@freshworks/api-sdk");

/**
 * Get employees sorted by employee_id in ascending order
 *
 * @param {string} domain
 * @param {string} apiKey
 * @param {number} page
 * @returns
 */
function getEmployees(domain, apiKey, page = 1) {
  const ft = new Freshteam(domain, apiKey);

  return ft.employees.list({
    sort: "employee_id",
    sort_type: "asc",
    page,
  });
}

async function getLastPage() {
  try {
    const { page } = await $db.get("sync_state");
    return page;
  } catch (err) {
    console.log(`Error getting last page: ${err.message}`);
    return 1;
  }
}

function incrementLastPage() {
  return $db.update("sync_state", "increment", { page: 1 });
}

function resetLastPage() {
  return $db.set("sync_state", { page: 1 }, { setIf: "exist" });
}

async function syncRecords(domain, apiKey) {
  try {
    const page = await getLastPage();
    const employees = await getEmployees(domain, apiKey, page);
    console.log("page", page);
    console.log(employees.length);
    if (employees.length) {
      await incrementLastPage();
    } else {
      await resetLastPage();
    }
    return employees.length;
  } catch (err) {
    console.log(`Error syncing: ${err.message}`);
    return 0;
  }
}

function createSchedule() {
  // Create a schedule to run every hour, starting 5 minutes from app install
  return $schedule.create({
    name: "freshteam_employee_sync",
    data: {},
    schedule_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // 5 minutes in the future
    repeat: {
      time_unit: "hours",
      frequency: 1,
    },
  });
}

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
    const domain = `${args.iparams.freshteam_domain}.freshteam.com`;
    const apiKey = args.iparams.freshteam_api_key;
    await syncRecords(domain, apiKey);
  },
};

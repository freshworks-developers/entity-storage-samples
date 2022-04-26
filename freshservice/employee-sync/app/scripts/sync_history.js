// ----------------------------
// Setup
// ----------------------------
function $(el) {
  return document.querySelector(el);
}

document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    app
      .initialized()
      .then(function (client) {
        client.events.on("app.activated", function () {
          onAppActivate(client);
        });
      })
      .catch(handleErr);
  }
};

async function onAppActivate(client) {
  const records = await lookupHistory(client);
  renderDataTable(records);
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}

// ----------------------------
// UI rendering
// ----------------------------

function renderDataTable(records) {
  const data = {
    columns: [
      {
        key: "start",
        text: "Sync Start",
        position: 1,
        formatData: (start) => new Date(start).toLocaleString(),
      },
      {
        key: "end",
        text: "Sync End",
        position: 2,
        formatData: (end) => new Date(end).toLocaleString(),
      },
      {
        key: "num",
        text: "Items synced",
        position: 3,
      },
      {
        key: "domain",
        text: "Domain",
        position: 3,
      },
    ],
    rows: records.map((r) => ({
      id: r.display_id,
      start: r.data.sync_start,
      end: r.data.sync_end,
      num: r.data.num_synced_records,
      domain: r.data.domain,
    })),
  };
  const syncHistory = document.getElementById("sync_history");
  syncHistory.columns = data.columns;
  syncHistory.rows = data.rows;
}

// ----------------------------
// Custom Objects interactions
// ----------------------------

/**
 * Lookup all sync history records
 *
 * @param {object} client - The client object
 * @todo Manage links for loads of data
 */
async function lookupHistory(client) {
  const entity = client.db.entity({ version: "v1" });
  const history = entity.get("sync_history");
  const { records } = await history.getAll();
  return records;
}

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
  const { requester } = await client.data.get("requester");
  const e = await lookupCustomer(client, requester.email);
  if (e === null) {
    console.log("Customer details not found");
    renderNotFound();
    return;
  }
  // Render the table
  renderCard(e.data);
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}

// ----------------------------
// UI rendering
// ----------------------------

function truthy(data) {
  if (typeof data !== "boolean") {
    return data;
  }
  return data ? "Yes" : "No";
}

function nullable(str) {
  if (str !== null) {
    return str;
  }
  return "N/A";
}

function renderDataTable(emp) {

}

function renderNotFound() {
  $("#container").innerHTML = `
    <div class="fw-type-sm fw-color-smoke-300">Customer record not found.</div>
  `;
}

// ----------------------------
// Entity Storage interactions
// ----------------------------

function customers(client) {
  const entity = client.db.entity({ version: "v1" });
  return entity.get("customers");
}

/**
 * Lookup a customer from the entity store using email address
 *
 * @param {object} client - The client object
 * @param {string} email - Email address to lookup with
 */
async function lookupCustomer(client, email) {
  const { records } = await customers(client).getAll({
    query: {
      // TODO: update query
      email
    },
  });
  if (!records.length) {
    return null;
  }
  return records[0];
}
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
  const e = await lookupEmployee(client, requester.email);
  if (e === null) {
    console.log("Employee not found");
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
  const data = {
    columns: [
      {
        key: "field",
        text: "Field",
        position: 1,
      },
      {
        key: "value",
        text: "Value",
        position: 2,
        formatData: (value) => nullable(truthy(value)),
      },
    ],
    rows: [
      {
        id: "data_branch_name",
        field: "Branch",
        value: `${emp.branch_name} ${emp.branch_main_office ? "(Main)" : ""}`.trim()
      },
      {
        id: "data_branch_location",
        field: "Location",
        value: `${emp.branch_city}, ${emp.branch_country}`
      },
      {
        id: "data_department",
        field: "Department",
        value: emp.department,
      },
      {
        id: "data_terminated",
        field: "Terminated",
        value: emp.terminated,
      },
      {
        id: "data_synced_at",
        field: "Last sync",
        value: new Date(emp.synced_at).toLocaleString(),
      },
    ],
  };
  const empData = document.getElementById("empDetails");
  empData.columns = data.columns;
  empData.rows = data.rows;
}

function renderNotFound() {
  $("#container").innerHTML = `
    <div class="fw-type-sm fw-color-smoke-300">Employee record not found.</div>
  `;
}

function renderCard(emp) {
  $("#emp_name").textContent = `${emp.first_name} ${emp.last_name}`.trim();
  $("#emp_designation").value = nullable(emp.designation);
  $("#emp_type").value = nullable(emp.employee_type);
  $("#emp_employee_id").textContent = nullable(emp.employee_id);
  renderDataTable(emp);
}

// ----------------------------
// Custom Objects interactions
// ----------------------------

function employees(client) {
  const entity = client.db.entity({ version: "v1" });
  return entity.get("employees");
}

/**
 * Lookup an employee from the custom objects store using email address
 *
 * @param {object} client - The client object
 * @param {string} email - Email address to lookup with
 */
async function lookupEmployee(client, email) {
  const { records } = await employees(client).getAll({
    query: { official_email: email },
  });
  if (!records.length) {
    return null;
  }
  return records[0];
}

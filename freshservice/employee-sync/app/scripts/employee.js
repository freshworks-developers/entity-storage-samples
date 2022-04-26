// ----------------------------
// Setup
// ----------------------------
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
    return;
  }
  // Render the table
  renderDataTable(e.data);
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
        textAlign: "center",
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
        id: "data_name",
        field: "Name",
        value: `${emp.first_name} ${emp.last_name}`,
      },
      {
        id: "data_designation",
        field: "Designation",
        value: emp.designation,
      },
      {
        id: "data_employee_type",
        field: "Type",
        value: emp.employee_type,
      },
      {
        id: "data_employee_id",
        field: "Employee ID",
        value: emp.employee_id,
      },
      {
        id: "data_terminated",
        field: "Terminated",
        value: emp.terminated,
      },
    ],
  };
  const empData = document.getElementById("empData");
  empData.columns = data.columns;
  empData.rows = data.rows;
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

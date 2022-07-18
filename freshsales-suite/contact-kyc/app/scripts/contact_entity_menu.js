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

function getContact(client, currentEntityId, iparams) {
  try {
    const url = `${iparams.fcrm_domain}api/contacts/${currentEntityId}`;
    const options = {
      headers: {
        Authorization: `Token token=${iparams.fcrm_api_key}`
      }
    }
    return client.request.get(url, options);
  } catch (e) {
    console.log("Error calling Freshworks CRM API ", e)
    return
  }
}

async function createContactEntity(client, contactDetails) {
  let contact_entity = await contacts(client);
  await contact_entity.create({
    customer_email: contactDetails.email,
    status: "Pending",
    applied_on: new Date().toISOString().split("T")[0],
    document_type: "Passport",
    document_id: new Date().getMilliseconds().toString(),
    document_url: "https://i.pinimg.com/736x/de/32/7b/de327b2a02ec37e43186a50d0d788e86.jpg"
  })
}

async function onAppActivate(client) {
  await getCurrentEntity(client)
}

async function getCurrentEntity(client) {

  const iparams = await client.iparams.get()
  const { currentEntityInfo } = await client.data.get("currentEntityInfo");
  const contact = await getContact(client, currentEntityInfo.currentEntityId, iparams)
  const contactDetails = JSON.parse(contact.response)
  const e = await lookupContact(client, contactDetails.contact.email);
  if (e === null) {
    console.log("Contact details not found");
    renderNotFound();
    await createContactEntity(client, contactDetails.contact)
    getCurrentEntity(client)
  }
  // Render the table
  renderCard(client, e.data);
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

function renderNotFound() {
  $("#container").innerHTML = `
    <div class="fw-type-sm fw-color-smoke-300">KYC record in progress....</div>
  `;
}

async function approveKYC(client, rowData) {
  let customer_email = rowData.customer_email
  let contact = await contacts(client).getAll({
    query: {
      customer_email
    },
  })
  let updatedKYC = contact.records[0].data
  updatedKYC.status = "Approved"
  updatedKYC.processed_on = new Date().toISOString()
  let { record } = await contacts(client).update(contact.records[0].display_id, updatedKYC);
  renderCard(client, record.data);
}

async function rejectKYC(client, rowData) {
  let customer_email = rowData.customer_email
  let contact = await contacts(client).getAll({
    query: {
      customer_email
    },
  })
  let updatedKYC = contact.records[0].data
  updatedKYC.status = "Rejected"
  updatedKYC.processed_on = new Date().toISOString()
  let { record } = await contacts(client).update(contact.records[0].display_id, updatedKYC);
  renderCard(client, record.data);
}

function renderCard(client, customer) {
  $("#container").innerHTML = ""
  $("#status").value = customer.status
  $("#kyc_doc").innerHTML = `<img src='${customer.document_url}' class='fw-m-8 fw-justify-center' height='50%'/>`
  switch (customer.status) {
    case "Approved":
      $("#status").color = "green"
      break;
    case "Pending":
      $("#status").color = "yellow"
      break;
    case "Rejected":
      $("#status").color = "red"
      break;
  }
  let records = []
  records.push(customer)
  renderDataTable(client, records)
}

function renderDataTable(client, records) {
  const data = {
    columns: [
      {
        key: "customer_email",
        text: "Email address",
        position: 1,
      },
      {
        key: "applied_on",
        text: "Applied on",
        position: 2,
        formatData: (applied_on) => new Date(applied_on).toLocaleString(),
      },
      {
        key: "document_type",
        text: "Document type",
        position: 3,
      },
      {
        key: "status",
        text: "KYC Status",
        position: 3,
      },
    ],
    rowActions: [{
      "name": "Approve",
      "handler": (rowData) => {
        approveKYC(client, rowData)
      }
    }, {
      "name": "Reject",
      "handler": (rowData) => {
        rejectKYC(client, rowData)
      }
    }
    ],
    rows: records.map((r) => ({
      customer_email: r.customer_email,
      applied_on: r.applied_on,
      document_type: r.document_type,
      status: r.status,
      processed_on: r.processed_on
    })),
  };
  const kycDetails = document.getElementById("kyc_pending");

  kycDetails.rows = data.rows;
  if (records[0].status == "Pending") {
    kycDetails.rowActions = data.rowActions;
  } else {
    data.columns.push({
      key: "processed_on",
      text: "Processed on",
      position: 2,
      formatData: (processed_on) => new Date(processed_on).toLocaleString(),
    })
  }
  kycDetails.columns = data.columns;
}

// ----------------------------
// Entity Storage interactions
// ----------------------------

function contacts(client) {
  const entity = client.db.entity({ version: "v1" });
  return entity.get("kyc_status");
}

/**
 * Lookup a customer from the entity store using email address
 *
 * @param {object} client - The client object
 * @param {string} customer_email - Email address to lookup with
 */
async function lookupContact(client, customer_email) {
  const { records } = await contacts(client).getAll({
    query: {
      // TODO: update query
      customer_email
    },
  });
  if (!records.length) {
    return null;
  }
  return records[0];
}
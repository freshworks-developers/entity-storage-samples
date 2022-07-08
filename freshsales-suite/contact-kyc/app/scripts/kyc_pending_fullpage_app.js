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
    renderDataTable(client, record.data);
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
    renderDataTable(client, record.data);
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
        })),
    };
    const kycDetails = document.getElementById("kyc_pending");
    kycDetails.columns = data.columns;
    kycDetails.rows = data.rows;
    kycDetails.rowActions = data.rowActions;
}

// ----------------------------
// Custom Objects interactions
// ----------------------------

/**
 * Lookup all sync history records
 *
 * @param {object} client - The client object
 */
async function lookupHistory(client) {
    const entity = client.db.entity({ version: "v1" });
    const history = entity.get("kyc_status");
    const { records } = await history.getAll({
        query: { status: "Pending" },
    });
    return records;
}

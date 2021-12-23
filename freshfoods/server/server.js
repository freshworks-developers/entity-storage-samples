const util = require("./lib/util");

let { co_record } = util;

exports = {
  events: [
    {
      event: "onAppInstall",
      callback: "onAppInstallHandler",
    },
    {
      event: "onTicketCreate",
      callback: "onTicketCreateHandler",
    },
  ],

  onTicketCreateHandler: function (args) {
    // Check if this is a delivery request
    if (
      args.data.ticket.tags &&
      args.data.ticket.tags.includes("delivery_request")
    ) {
      // Get the ticket fields
      console.info("🏍 We have a Delivery Request!");
      console.info("Logging args. Parsing request data...");
      util.logIt(args.iparams["logger-url"], "onTicketCreate", args);
      Promise.resolve(util.parseStandardFields(args.data))
        .then((data) => {
          console.info("(1/4) Reverse geocoding");
          return util.reverseGeoCode(args, data);
        })
        .then((data) => {
          console.info("(2/4) Obtaining distance matrix");
          return util.computeDistanceMatrix(args, data);
        })
        .then((data) => {
          console.info("(3/4) Creating a delivery request");
          return util.createDeliveryRequest(args, data, "delivery_requests");
        })
        .then((response) => {
          util.logIt(
            args.iparams["logger-url"],
            "entityRecordCreated",
            response.data
          );
          console.info("(4/4) Entity record creation was successful!");
        })
        .catch((err) => {
          console.error("Something went wrong", err);
          util.logIt(
            args.iparams["logger-url"],
            "entityRecordCreateFailed",
            err
          );
        });
    } else {
      console.info("Not a Delivery Request! Never Mind");
    }
  },

  onAppInstallHandler: function () {
    // Log successful app installation
    console.info("onAppInstall handler is triggered");
    renderData();
  },
};

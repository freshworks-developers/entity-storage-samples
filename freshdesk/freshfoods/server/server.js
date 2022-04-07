const util = require("./lib/util");

exports = {
  onTicketCreateHandler: function (args) {
    // Check if this is a delivery request
    if (
      args.data.ticket.tags &&
      args.data.ticket.tags.includes("delivery_request")
    ) {
      // Get the ticket fields
      console.log("🏍 We have a Delivery Request!");
      console.log("Logging args. Parsing request data...");
      Promise.resolve(util.parseStandardFields(args.data))
        .then((data) => {
          console.log("(1/4) Reverse geocoding");
          return util.reverseGeoCode(args, data);
        })
        .then((data) => {
          console.log("(2/4) Obtaining distance matrix");
          return util.computeDistanceMatrix(args, data);
        })
        .then((data) => {
          console.log("(3/4) Creating a delivery request");
          return util.createDeliveryRequest(args, data, "delivery_requests");
        })
        .then(() => {
          console.log("(4/4) Entity record creation was successful!");
        })
        .catch((err) => {
          util.handleError(
            err,
            "Something went wrong with onTicketCreateHandler"
          );
        });
    } else {
      console.log("Not a Delivery Request! Never Mind");
    }
  },

  onAppInstallHandler: function () {
    // Log successful app installation
    console.log("onAppInstall handler is triggered");
    renderData();
  },
};

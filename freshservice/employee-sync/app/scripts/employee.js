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

}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}


// ----------------------------
// Custom Objects interactions
// ----------------------------


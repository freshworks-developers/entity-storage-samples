"use strict";

app.initialized().then(
  (client) => {
    setup(client);
  },
  (err) => {
    console.log("Error in app", err);
    return;
  }
);

function parseLatLong(description) {
  let latlong;
  try {
    const doc = new DOMParser().parseFromString(description, "text/html");
    latlong = doc.getElementById("loc_latlong").textContent;
  } catch (err) {
    console.log("error getting latlong from description", err);
    console.log("falling back to hardcoded description for demo");

    const desc = `<div class="pm"> Hi, Markus Aurelius here &#128075; ! Is it possible to get the following items delivered to our location ? Thanks</div>  <hr>
      <b>&#128722; Items: </b><span id="items">Orange &amp; Grape Basket [M], Assorted Fruits Basket</span> <br> <b>&#128203; Category: </b> <span id="category">Fresh Produce</span> <br><b>&#128205; Geo: </b><span id="loc_latlong">37.69414437, -122.4617431</span> <br> <b>&#128181; Cart Value: </b><span id="cart_val">200</span><hr>`;
    latlong = parseLatLong(desc);
  }
  return latlong;
}

async function renderMap(client, lat, long) {
  mapboxgl.accessToken = (
    await client.iparams.get("mapbox_token")
  ).mapbox_token;
  let map = new mapboxgl.Map({
    container: "map",
    zoom: 10,
    center: [long, lat],
    style: "mapbox://styles/mapbox/streets-v11",
  });

  new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);
}

async function setAddress(client, lat, long) {
  let response;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?key=<%= iparam.gmp_api_key %>&latlng=${lat},${long}`;
    const res = await client.request.get(url);
    response = JSON.parse(res.response);
  } catch (e) {
    console.log("Error looking up address using geocode API", e);
    return;
  }
  console.log("Response from geocode API", response);

  document.getElementById("address").innerHTML = `
    📍 ${response.results[0].formatted_address}<br/><br/>
    <a href="https://freshfoods.freshpo.com/a/apps/freshfoods-delivery-request-insights?dev=true'" target="_blank">
      <fw-button size="small">View All Requests </fw-button>
    </a>`;
}

async function getRecords(client) {
  const entity = client.db.entity({ version: "v1" });
  const dr = entity.get("delivery_requests");

  try {
    const data = await dr.getAll();
    const cur_record = data.records
      .map((i) => i.data)
      .filter((i) => i.ticket_id === data.ticket.id);
    console.log("Current record", cur_record);
  } catch (e) {
    console.log("Error fetching records of Custom Objects", e);
  }
}

async function setup(client) {
  client.instance.resize({ height: "350px" });
  const data = await client.data.get("ticket");
  const latlong = parseLatLong(data.ticket.description);
  console.log("Retrieved latlong", latlong);

  if (latlong && latlong.length > 0) {
    const [lat, long] = latlong.split(",").map((i) => parseFloat(i));

    await renderMap(client, lat, long);
    await setAddress(client, lat, long);
    await getRecords(client);
  }
}

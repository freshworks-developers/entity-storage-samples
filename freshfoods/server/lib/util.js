const cheerio = require("cheerio");

//Sample Entity Record Payload
let co_record = {
  contact_id: "dummmy@example.com",
  contact_name: "N.A",
  ticket_id: 0,
  loc_lat: 0,
  loc_long: 0,
  loc_zipcode: 0,
  loc_locality: "",
  loc_area2: "",
  loc_area1: "",
  loc_country: "",
  cart_value: 0,
  near_del_cen: "",
  category: "",
  status: "0",
  items: "",
  cart_value_bucket: 0,
};

// From low to high
function getCartValueCategory(cv) {
  switch (true) {
    case cv <= 100:
      return 1;
    case cv > 100 && cv <= 250:
      return 2;
    case cv > 250 && cv <= 500:
      return 3;
    case cv > 500 && cv <= 750:
      return 4;
    case cv > 750 && cv <= 1000:
      return 5;
    case cv > 1000:
      return 6;
  }
}

// Parse the ticket description to obtain the details
function parseStandardFields(data) {
  //Parse lat,long from ticket
  const dom = cheerio.load(decodeURI(data.ticket.description));
  //... and obtain Geo Points
  let loc_latlong = dom("#loc_latlong").text();
  // Get Cart value
  let cv = parseInt(dom("#cart_val").text());
  co_record.cart_value = parseFloat(cv);

  let categ = dom("#category").text();
  let items = dom("#items").text();
  return {
    contact_id: data.requester.email,
    contact_name: data.requester.name,
    ticket_id: parseInt(data.ticket.id),
    loc_lat: parseFloat(loc_latlong.split(",")[0]),
    loc_long: parseFloat(loc_latlong.split(",")[1]),
    cart_value: parseInt(cv),
    category: categ.includes("Dairy") ? "[M]" : "[F]",
    cart_value_bucket: getCartValueCategory(parseInt(cv)),
    status: "0",
    items: items,
  };
}

// Obtain structured data of the address components
async function reverseGeoCode(args, data) {
  let t_cor = {};
  const key = args.iparams["gmp-api-key"];
  const latlng = String(data.loc_lat) + "," + String(data.loc_long);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&latlng=${latlng}`;
  let response;

  try {
    response = await $request.get(url);
  } catch (e) {
    throw e;
  }

  // Get locality
  const ac = response.data.results[0].address_components;
  for (const i in ac) {
    if (ac[i].types.includes("locality")) {
      t_cor.loc_locality = ac[i].long_name;
      break;
    }
  }
  // Get loc_zipcode
  for (const i in ac) {
    if (ac[i].types.includes("postal_code")) {
      t_cor.loc_zipcode = parseInt(ac[i].long_name);
      break;
    }
  }
  // Get loc_area2
  for (const i in ac) {
    if (ac[i].types.includes("administrative_area_level_2")) {
      t_cor.loc_area2 = ac[i].long_name;
      break;
    }
  }

  // Get loc_area1
  for (const i in ac) {
    if (ac[i].types.includes("administrative_area_level_1")) {
      t_cor.loc_area1 = ac[i].long_name;
      break;
    }
  }

  // Get country
  for (const i in ac) {
    if (ac[i].types.includes("country")) {
      t_cor.loc_country = ac[i].long_name;
      break;
    }
  }
  Object.assign(data, t_cor);
  return data;
}

// Use Google Maps API to obtain the distance between delivery hubs
async function computeDistanceMatrix(args, data) {
  const units = "metric";
  const origins = String(data.loc_lat) + "," + String(data.loc_long);
  const dest =
    "37.564457,-122.331298|37.42097, -122.130387|37.320918,-122.036744"; // Delivery hubs are hardcoded, supposed to be separate entities on their own
  const key = args.iparams["gmp-api-key"];
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?key=${key}&units=${units}&origins=${origins}&destinations=${dest}`;
  let response;

  try {
    response = await $request.get(url);
  } catch (e) {
    throw e;
  }

  Object.assign(data, {
    near_del_cen: JSON.stringify(response.data.rows[0].elements),
  });
  return data;
}

// Creates the C.O record
function createDeliveryRequest(args, data, ent_name) {
  const entity = $db.entity({
    version: "v1",
  });
  const delivery_requests = entity.get(ent_name);
  console.log(data);
  return delivery_requests.create(data);
}

// Logging utility function
function logIt(u, p, m) {
  try {
    let msg = JSON.stringify(m);
    console.log("Logging : ", msg);
    $request.post(`${u}/${p}`, {
      body: msg,
    });
  } catch (error) {
    console.error("Oops, Something went wrong!");
    console.error(error);
  }
}

exports = {
  co_record,
  parseStandardFields,
  computeDistanceMatrix,
  reverseGeoCode,
  createDeliveryRequest,
  logIt,
};

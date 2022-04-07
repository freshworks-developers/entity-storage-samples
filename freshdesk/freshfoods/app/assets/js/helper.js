var popup;
var planPopup;

function initMap(accessToken) {
  // Mapbox Access Token
  mapboxgl.accessToken = accessToken;
  var map = new mapboxgl.Map({
    container: "map",
    zoom: 10,
    center: [-122.226117, 37.48036],
    style: "mapbox://styles/mapbox/streets-v11",
  });

  map.addControl(new mapboxgl.NavigationControl());
  return map;
}

function addIcons(map) {
  map.loadImage("https://i.imgur.com/U7TdBV4.png", function (error, image) {
    if (error) throw error;
    map.addImage("[F]", image);
  });

  map.loadImage("https://i.imgur.com/rgclJxa.png", function (error, image) {
    if (error) throw error;
    map.addImage("[M]", image);
  });

  map.loadImage("https://i.imgur.com/fxWIH2L.png", function (error, image) {
    if (error) throw error;
    map.addImage("[F,M]", image);
  });
}

function addLayers(map, filter, colors) {
  map.addLayer({
    id: "delivery_request_circle",
    type: "circle",
    source: "delivery_requests",
    filter: ["!=", "cluster", true],
    paint: {
      "circle-color": [
        "case",
        filter.fruit,
        colors[0],
        filter.milk,
        colors[1],
        colors[2],
      ],
      "circle-opacity": 0.6,
      "circle-radius": 18,
    },
  });

  map.addLayer({
    id: "points",
    type: "symbol",
    filter: ["!=", "cluster", true],
    source: "delivery_requests",
    layout: {
      "icon-image": ["get", "category"],
      "icon-size": 1,
    },
  });

  map.addLayer({
    id: "delivery-centers",
    type: "fill",
    source: "delivery-centers",
    layout: {},
    paint: {
      "fill-color": "green",
      "fill-opacity": 0.2,
    },
  });

  map.addLayer({
    id: "planning-delivery",
    type: "fill",
    source: "planning-ds",
    layout: {},
    paint: {
      "fill-color": "violet",
      "fill-opacity": 0.3,
    },
  });

  // map.addLayer({
  //     "id": "delivery-center-3",
  //     "type": "fill",
  //     "source": "delivery-center-3",
  //     "layout": {},
  //     "paint": {
  //         "fill-color": "green",
  //         "fill-opacity": 0.2
  //     }
  // });

  // map.addLayer({
  //     'id': 'delivery_requests_label',
  //     'type': 'symbol',
  //     'source': 'delivery_requests',
  //     'filter': ['!=', 'cluster', true],
  //     'layout': {
  //         'text-field': [
  //             'format',
  //             ['get', 'cart_value']
  //         ],
  //         'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  //         'text-size': 10
  //     }
  // });
}

function inBounds(point, bounds) {
  var eastBound = point[0] < bounds._ne.lng;
  var westBound = point[0] > bounds._sw.lng;
  var inLong;

  if (bounds._ne.lng < bounds._sw.lng) {
    inLong = eastBound || westBound;
  } else {
    inLong = eastBound && westBound;
  }

  var inLat = point[1] > bounds._sw.lat && point[1] < bounds._ne.lat;
  return inLat && inLong;
}

function createDelSpots(pt, text) {
  var el = document.createElement("div");
  el.className = "del-hub";

  el.innerText = text;

  new mapboxgl.Marker(el).setLngLat(pt).addTo(map);
}

function changeData(map, data) {
  console.log("changeData called", data);
  const src = map.getSource("delivery_requests");
  if (src === undefined) return;
  src.setData(data);
  for (id in markersOnScreen) {
    markersOnScreen[id].remove();
  }
  for (id in markers) {
    markers[id].remove();
  }
  markersOnScreen = {};
  markers = {};
}

function registerEvents(map) {
  map.on("data", function (e) {
    if (e.sourceId !== "delivery_requests" || !e.isSourceLoaded) return;
    map.on("move", () => {
      updateMarkers(map);
    });
    map.on("moveend", () => {
      updateMarkers(map);
    });
    updateMarkers(map);
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on("mouseenter", "delivery_request_circle", function (e) {
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var prop = e.features[0].properties;
    var custom_html = `
            <div class="media map-popup-item">
            <img width="100px" class="align-self-center ml-2 mr-3" src="https://avatar.oxro.io/avatar.svg?name=${
              prop.contact_name
            }.svg&fontSize=120&bold=true" alt="">
            <div class="media-body">
              <h5 class="mt-0">  ${prop.contact_name}  </h5>
              <p>📍 ${prop.loc_locality}, ${prop.loc_area2}, ${
      prop.loc_area1
    }<br/>
                 🛒 ${
                   prop.category == "[M]" ? "Dairy Products" : "Fresh Produce"
                 } <br/>
                <fw-label value='$ ${
                  prop.cart_value
                }' color='green'> </fw-label> </p>
            </div>
          </div>
            `;
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    if (!planningMode)
      if (popup) {
        popup.setLngLat(coordinates).setHTML(custom_html);

        if (!popup.isOpen()) popup.addTo(map);
      } else {
        popup = new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(custom_html)
          .addTo(map);
      }
  });
  map.on("mousemove", function (e) {
    if (planningMode) {
      let radiusP = document.getElementById("myRange").value;
      let nCov = (20 / 100) * parseInt(radiusP) * 1.6;
      document.getElementById("covkm").innerHTML = parseInt(nCov) + " mi ";
      map
        .getSource("planning-ds")
        .setData(createGeoJSONCircle([e.lngLat.lng, e.lngLat.lat], nCov));
      planCoverageAreas = [];
      planCoverageAreas = pointsOnScreen.filter((i) => {
        if (
          distance(
            i.geometry.coordinates[1],
            i.geometry.coordinates[0],
            parseFloat(e.lngLat.lat),
            parseFloat(e.lngLat.lng)
          ) < nCov
        ) {
          return true;
        }
      });
      planCoverageAreaTotal = 0;
      planCoverageAreas.forEach((i) => {
        planCoverageAreaTotal += i.properties.cart_value;
      });
      // console.log(dp);
      // if (planPopup) {

      //     planPopup.setLngLat([e.lngLat.lng, e.lngLat.lat])
      //         .setHTML("<div id='plan-card'>Hi</div>");

      //     if (!planPopup.isOpen())
      //         planPopup.addTo(map);

      // } else {
      //     planPopup = new mapboxgl.Popup()
      //         .setLngLat([e.lngLat.lng, e.lngLat.lat])
      //         .setHTML("<b>Hi</b>")
      //         .addTo(map);
      // }
    } else {
    }
  });
  map.on("mouseleave", "delivery_request_circle", function () {
    map.getCanvas().style.cursor = "grab";
    setTimeout(() => {
      popup.remove();
    }, 5000);
  });

  map.on("zoom", () => {
    // console.log(map.getBounds())
    // console.log("Zoom Event has occured");
  });
  map.on("click", function () {
    if (document.getElementById("plannerm").checked) {
      planningMode = !planningMode;
      document.querySelector("#type_toast").trigger({
        type: "success",
        timeout: 10000,
        content: `🎪 Wohoo! That covers ${planCoverageAreas.length} new customer(s) worth $ ${planCoverageAreaTotal} / month ! 🎉`,
      }).catch(console.log);
      planDecided = true;
      document.getElementById("plannerm").checked = false;
    }
  });
  map.on("click", "delivery_request_circle", function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var prop = e.features[0].properties;
    var custom_html = `
            <div class="media map-popup-item">
            <img width="100px" class="align-self-center ml-2 mr-3" src="https://avatar.oxro.io/avatar.svg?name=${
              prop.contact_name
            }.svg&fontSize=120&bold=true" alt="">
            <div class="media-body">
              <h5 class="mt-0">  ${prop.contact_name}  </h5>
              <p>📍 ${prop.loc_locality}, ${prop.loc_area2}, ${
      prop.loc_area1
    }<br/>
                 🛒 ${
                   prop.category == "[M]" ? "Dairy Products" : "Fresh Produce"
                 } <br/>
                <fw-label value='$ ${
                  prop.cart_value
                }' color='green'> </fw-label> </p>
            </div>
          </div>
            `;

    d_app.active_item = prop;
    d_app.nearby_req_list = mockData.filter((req) => {
      return d_app.active_item.loc_area2 == req.loc_area2;
    });
    map.flyTo({
      zoom: 20,
      center: [d_app.active_item.loc_long, d_app.active_item.loc_lat],
      essential: true, // this animation is considered essential with respect to prefers-reduced-motion
    });
    document.getElementById("list").style.display = "none";
    document.getElementById("detail-list").style.display = "block";

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(custom_html)
      .addTo(map);
  });
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
// objects for caching and keeping track of HTML marker objects (for performance)
function updateMarkers(map) {
  var newMarkers = {};
  var features = map.querySourceFeatures("delivery_requests");
  var bound = map.getBounds();
  pointsOnScreen = [];
  // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
  // and add it to the map if it's not there already
  var localMapData = mapTransform(d_app.getDat());
  for (var x = 0; x < localMapData.features.length; x++) {
    var coords = localMapData.features[x].geometry.coordinates;
    var props = localMapData.features[x].properties;

    if (inBounds(coords, bound)) {
      pointsOnScreen.push(localMapData.features[x]);
    }
  }

  for (var i = 0; i < features.length; i++) {
    var coords = features[i].geometry.coordinates;
    var props = features[i].properties;

    if (!props.cluster) continue;
    var id = props.cluster_id;

    var marker = markers[id];
    if (!marker) {
      var el = createDonutChart(props);
      marker = markers[id] = new mapboxgl.Marker({
        element: el,
      }).setLngLat(coords);
    }
    newMarkers[id] = marker;

    if (!markersOnScreen[id]) marker.addTo(map);
  }
  window.flint = false;
  // for every marker we've added previously, remove those that are no longer visible
  for (id in markersOnScreen) {
    if (!newMarkers[id]) markersOnScreen[id].remove();
  }
  markersOnScreen = newMarkers;
  // console.log(pointsOnScreen);
  var total = 0;
  pointsOnScreen.forEach((i) => {
    total += i.properties.cart_value;
  });
  document.getElementById("tile-x-number").innerHTML = pointsOnScreen.length;
  document.getElementById("tile-y-number").innerHTML =
    "<small>$</small> " + total;
}

var createGeoJSONCircle = function (
  center,
  radiusInKm,
  points,
  prop = {
    description: "",
  }
) {
  if (!points) points = 64;

  var coords = {
    latitude: center[1],
    longitude: center[0],
  };

  var km = radiusInKm;

  var ret = [];
  var distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
  var distanceY = km / 110.574;

  var theta, x, y;
  for (var i = 0; i < points; i++) {
    theta = (i / points) * (2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    type: "Feature",
    properties: prop,
    geometry: {
      type: "Polygon",
      coordinates: [ret],
    },
  };
};

function mapTransform(data) {
  let geoJSONData = data.map((item) => {
    return {
      type: "Feature",
      properties: item,
      geometry: {
        type: "Point",
        coordinates: [item.loc_long, item.loc_lat],
      },
    };
  });
  return {
    type: "FeatureCollection",
    features: geoJSONData,
  };
}

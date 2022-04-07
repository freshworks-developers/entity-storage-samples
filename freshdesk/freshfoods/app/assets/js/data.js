let milkIcon = "https://i.imgur.com/rgclJxa.png",
  fruitIcon = "https://i.imgur.com/U7TdBV4.png",
  markers = {},
  markersOnScreen = {},
  pointsOnScreen = [],
  styleLoaded = false,
  // Filters for classifying delivery requests into 2 categories based on the item category
  fruit = ["in", "[F]", ["get", "category"]],
  milk = ["in", "[M]", ["get", "category"]],
  // Colors to use for the categories
  filter = { fruit, milk },
  colors = ["#fbbc05", "#00a1f1", "#e1e1e0"],
  planningMode = false,
  planDecided = false,
  planCoverageAreas = [],
  planCoverageAreaTotal = 0,
  mockData = [
    {
      cart_value_bucket: 3,
      contact_name: "Mike Paul",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.6964365228764,
      contact_id: "mikepaul@example.com",
      ticket_id: 89,
      loc_locality: "Daly City",
      near_del_cen:
        '[{"distance":{"text":"24.8 km","value":24844},"duration":{"text":"24 mins","value":1439},"status":"OK"},{"distance":{"text":"53.7 km","value":53709},"duration":{"text":"40 mins","value":2384},"status":"OK"},{"distance":{"text":"64.0 km","value":63986},"duration":{"text":"43 mins","value":2563},"status":"OK"}]',
      loc_long: -122.46123075485228,
      loc_area2: "San Mateo County",
      loc_zipcode: 94014,
      loc_area1: "California",
      category: "[F]",
      items:
        "Apple, Banana, Cherry Basket [Large],Assorted Fruits Basket,Peaches & Apricot Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Carisa Zamorano",
      cart_value: 200,
      loc_country: "United States",
      loc_lat: 37.71248808,
      contact_id: "carisazamorano@example.com",
      ticket_id: 88,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"31.6 km","value":31606},"duration":{"text":"26 mins","value":1536},"status":"OK"},{"distance":{"text":"57.0 km","value":57048},"duration":{"text":"41 mins","value":2468},"status":"OK"},{"distance":{"text":"67.3 km","value":67325},"duration":{"text":"44 mins","value":2647},"status":"OK"}]',
      loc_long: -122.449193,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items:
        "Ghee, Cottage Cheese (Paneer) Pack,Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Tawna Ewart",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.71252203,
      contact_id: "tawnaewart@example.com",
      ticket_id: 87,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"31.2 km","value":31210},"duration":{"text":"25 mins","value":1520},"status":"OK"},{"distance":{"text":"56.7 km","value":56652},"duration":{"text":"41 mins","value":2449},"status":"OK"},{"distance":{"text":"66.9 km","value":66929},"duration":{"text":"44 mins","value":2627},"status":"OK"}]',
      loc_long: -122.4506629,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items: "Butter & Cheese Combo Pack,Swiss Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Aracelis Helbing",
      cart_value: 100,
      loc_country: "United States",
      loc_lat: 37.71190244,
      contact_id: "aracelishelbing@example.com",
      ticket_id: 86,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"31.1 km","value":31114},"duration":{"text":"25 mins","value":1486},"status":"OK"},{"distance":{"text":"56.6 km","value":56555},"duration":{"text":"40 mins","value":2415},"status":"OK"},{"distance":{"text":"66.8 km","value":66833},"duration":{"text":"43 mins","value":2593},"status":"OK"}]',
      loc_long: -122.4514353,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Kip Raffa",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.71509793,
      contact_id: "kipraffa@example.com",
      ticket_id: 85,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"27.9 km","value":27885},"duration":{"text":"25 mins","value":1524},"status":"OK"},{"distance":{"text":"56.8 km","value":56750},"duration":{"text":"41 mins","value":2470},"status":"OK"},{"distance":{"text":"67.0 km","value":67027},"duration":{"text":"44 mins","value":2648},"status":"OK"}]',
      loc_long: -122.4523419,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large], Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Albina Ringer",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.2883,
      contact_id: "albinaringer@example.com",
      ticket_id: 84,
      loc_locality: "Campbell",
      near_del_cen:
        '[{"distance":{"text":"54.5 km","value":54527},"duration":{"text":"39 mins","value":2352},"status":"OK"},{"distance":{"text":"33.4 km","value":33449},"duration":{"text":"28 mins","value":1666},"status":"OK"},{"distance":{"text":"15.5 km","value":15520},"duration":{"text":"16 mins","value":966},"status":"OK"}]',
      loc_long: -121.9485,
      loc_area2: "Santa Clara County",
      loc_zipcode: 95008,
      loc_area1: "California",
      category: "[M]",
      items: "Sour Cream [12 pc],Butter & Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Loida Denn",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.2891,
      contact_id: "loidadenn@example.com",
      ticket_id: 83,
      loc_locality: "Campbell",
      near_del_cen:
        '[{"distance":{"text":"54.6 km","value":54585},"duration":{"text":"38 mins","value":2281},"status":"OK"},{"distance":{"text":"33.5 km","value":33507},"duration":{"text":"27 mins","value":1595},"status":"OK"},{"distance":{"text":"15.6 km","value":15578},"duration":{"text":"15 mins","value":895},"status":"OK"}]',
      loc_long: -121.9495,
      loc_area2: "Santa Clara County",
      loc_zipcode: 95008,
      loc_area1: "California",
      category: "[M]",
      items:
        "Yogurt & Cheese Pack,10 Gallon Organic Milk,Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Shirlee Schatz",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.4342,
      contact_id: "shirleeschatz@example.com",
      ticket_id: 82,
      loc_locality: "Woodside",
      near_del_cen:
        '[{"distance":{"text":"20.5 km","value":20499},"duration":{"text":"20 mins","value":1192},"status":"OK"},{"distance":{"text":"16.7 km","value":16749},"duration":{"text":"17 mins","value":1024},"status":"OK"},{"distance":{"text":"27.0 km","value":27026},"duration":{"text":"20 mins","value":1202},"status":"OK"}]',
      loc_long: -122.2576,
      loc_area2: "San Mateo County",
      loc_zipcode: 94062,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Vivan Lalli",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.4341,
      contact_id: "vivanlalli@example.com",
      ticket_id: 81,
      loc_locality: "Woodside",
      near_del_cen:
        '[{"distance":{"text":"20.5 km","value":20523},"duration":{"text":"20 mins","value":1196},"status":"OK"},{"distance":{"text":"16.8 km","value":16773},"duration":{"text":"17 mins","value":1028},"status":"OK"},{"distance":{"text":"27.0 km","value":27050},"duration":{"text":"20 mins","value":1206},"status":"OK"}]',
      loc_long: -122.2571,
      loc_area2: "San Mateo County",
      loc_zipcode: 94062,
      loc_area1: "California",
      category: "[F]",
      items: "Orange & Grape Basket [M], Peaches & Apricot Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Darius Bosch",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.4323,
      contact_id: "dariusbosch@example.com",
      ticket_id: 80,
      loc_locality: "Woodside",
      near_del_cen:
        '[{"distance":{"text":"20.8 km","value":20803},"duration":{"text":"20 mins","value":1197},"status":"OK"},{"distance":{"text":"16.5 km","value":16484},"duration":{"text":"16 mins","value":983},"status":"OK"},{"distance":{"text":"26.8 km","value":26761},"duration":{"text":"19 mins","value":1162},"status":"OK"}]',
      loc_long: -122.2554,
      loc_area2: "San Mateo County",
      loc_zipcode: 94062,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large], Mangoes, Banana, Berries [L] Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Ashlee Covington",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.71685052,
      contact_id: "ashleecovington@example.com",
      ticket_id: 79,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"29.2 km","value":29172},"duration":{"text":"24 mins","value":1444},"status":"OK"},{"distance":{"text":"58.0 km","value":58037},"duration":{"text":"40 mins","value":2389},"status":"OK"},{"distance":{"text":"68.3 km","value":68314},"duration":{"text":"43 mins","value":2568},"status":"OK"}]',
      loc_long: -122.4540102,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items:
        "Swiss Cheese Combo Pack,Butter & Cheese Combo Pack,Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Tawanda Dealba",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.71767375,
      contact_id: "tawandadealba@example.com",
      ticket_id: 78,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"29.1 km","value":29077},"duration":{"text":"24 mins","value":1427},"status":"OK"},{"distance":{"text":"57.9 km","value":57941},"duration":{"text":"40 mins","value":2373},"status":"OK"},{"distance":{"text":"68.2 km","value":68219},"duration":{"text":"43 mins","value":2551},"status":"OK"}]',
      loc_long: -122.4536133,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Apple, Banana, Cherry Basket [Large],Cold-Pressed Juice 1 Gallon,Orange & Grape Basket [M]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Kathrine Nilges",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.71863276,
      contact_id: "kathrinenilges@example.com",
      ticket_id: 77,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.9 km","value":28944},"duration":{"text":"23 mins","value":1405},"status":"OK"},{"distance":{"text":"57.8 km","value":57809},"duration":{"text":"39 mins","value":2351},"status":"OK"},{"distance":{"text":"68.1 km","value":68086},"duration":{"text":"42 mins","value":2529},"status":"OK"}]',
      loc_long: -122.4527872,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large],Cold-Pressed Juice 1 Gallon,Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Cecelia Thetford",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.71980392,
      contact_id: "ceceliathetford@example.com",
      ticket_id: 76,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.8 km","value":28802},"duration":{"text":"23 mins","value":1386},"status":"OK"},{"distance":{"text":"57.7 km","value":57667},"duration":{"text":"39 mins","value":2332},"status":"OK"},{"distance":{"text":"67.9 km","value":67944},"duration":{"text":"42 mins","value":2510},"status":"OK"}]',
      loc_long: -122.4514139,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Ezekiel Spiva",
      cart_value: 100,
      loc_country: "United States",
      loc_lat: 37.72066956,
      contact_id: "ezekielspiva@example.com",
      ticket_id: 75,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.9 km","value":28898},"duration":{"text":"23 mins","value":1402},"status":"OK"},{"distance":{"text":"57.8 km","value":57762},"duration":{"text":"39 mins","value":2348},"status":"OK"},{"distance":{"text":"68.0 km","value":68040},"duration":{"text":"42 mins","value":2526},"status":"OK"}]',
      loc_long: -122.4511671,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items: "Peaches & Apricot Basket [Large], Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Tory Beirne",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.72107691,
      contact_id: "torybeirne@example.com",
      ticket_id: 74,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.7 km","value":28669},"duration":{"text":"23 mins","value":1380},"status":"OK"},{"distance":{"text":"57.5 km","value":57533},"duration":{"text":"39 mins","value":2326},"status":"OK"},{"distance":{"text":"67.8 km","value":67810},"duration":{"text":"42 mins","value":2504},"status":"OK"}]',
      loc_long: -122.4509096,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items: "Butter & Cheese Combo Pack,Sour Cream [12 pc]",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Lourie Macklin",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.72151821,
      contact_id: "louriemacklin@example.com",
      ticket_id: 73,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.7 km","value":28725},"duration":{"text":"23 mins","value":1389},"status":"OK"},{"distance":{"text":"57.6 km","value":57590},"duration":{"text":"39 mins","value":2335},"status":"OK"},{"distance":{"text":"67.9 km","value":67867},"duration":{"text":"42 mins","value":2513},"status":"OK"}]',
      loc_long: -122.4505877,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items: "Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Lourie Macklin",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.72151821,
      contact_id: "louriemacklin@example.com",
      ticket_id: 73,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"28.7 km","value":28725},"duration":{"text":"23 mins","value":1389},"status":"OK"},{"distance":{"text":"57.6 km","value":57590},"duration":{"text":"39 mins","value":2335},"status":"OK"},{"distance":{"text":"67.9 km","value":67867},"duration":{"text":"42 mins","value":2513},"status":"OK"}]',
      loc_long: -122.4505877,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items: "Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Porfirio Rodrigez",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.72192555,
      contact_id: "porfiriorodrigez@example.com",
      ticket_id: 72,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"29.9 km","value":29923},"duration":{"text":"25 mins","value":1488},"status":"OK"},{"distance":{"text":"58.2 km","value":58206},"duration":{"text":"41 mins","value":2430},"status":"OK"},{"distance":{"text":"68.5 km","value":68483},"duration":{"text":"43 mins","value":2608},"status":"OK"}]',
      loc_long: -122.4568534,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Britta Wightman",
      cart_value: 100,
      loc_country: "United States",
      loc_lat: 37.72247717,
      contact_id: "brittawightman@example.com",
      ticket_id: 71,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"29.9 km","value":29911},"duration":{"text":"25 mins","value":1481},"status":"OK"},{"distance":{"text":"58.2 km","value":58195},"duration":{"text":"40 mins","value":2426},"status":"OK"},{"distance":{"text":"68.5 km","value":68472},"duration":{"text":"43 mins","value":2605},"status":"OK"}]',
      loc_long: -122.4572825,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[M]",
      items: "10 Gallon Organic Milk,Sour Cream [12 pc]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Reynaldo Swafford",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.72345309,
      contact_id: "reynaldoswafford@example.com",
      ticket_id: 70,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"29.8 km","value":29803},"duration":{"text":"24 mins","value":1463},"status":"OK"},{"distance":{"text":"58.1 km","value":58086},"duration":{"text":"40 mins","value":2408},"status":"OK"},{"distance":{"text":"68.4 km","value":68363},"duration":{"text":"43 mins","value":2586},"status":"OK"}]',
      loc_long: -122.457304,
      loc_area2: "San Francisco County",
      loc_zipcode: 94112,
      loc_area1: "California",
      category: "[F]",
      items: "Cold-Pressed Juice 1 Gallon, Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Elza Bland",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.72196799,
      contact_id: "elzabland@example.com",
      ticket_id: 69,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"27.8 km","value":27817},"duration":{"text":"24 mins","value":1428},"status":"OK"},{"distance":{"text":"56.7 km","value":56682},"duration":{"text":"40 mins","value":2374},"status":"OK"},{"distance":{"text":"67.0 km","value":66959},"duration":{"text":"43 mins","value":2552},"status":"OK"}]',
      loc_long: -122.464546,
      loc_area2: "San Francisco County",
      loc_zipcode: 94132,
      loc_area1: "California",
      category: "[F]",
      items:
        "Assorted Fruits Basket,Assorted Fruits Basket,Pineapple, Watermelon, Grapes Basket [Medium] ",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Floria Lewellyn",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.72198496,
      contact_id: "florialewellyn@example.com",
      ticket_id: 68,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"27.6 km","value":27642},"duration":{"text":"24 mins","value":1414},"status":"OK"},{"distance":{"text":"56.5 km","value":56507},"duration":{"text":"39 mins","value":2360},"status":"OK"},{"distance":{"text":"66.8 km","value":66784},"duration":{"text":"42 mins","value":2538},"status":"OK"}]',
      loc_long: -122.4664611,
      loc_area2: "San Francisco County",
      loc_zipcode: 94127,
      loc_area1: "California",
      category: "[F]",
      items: "Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Carlotta Lohr",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.71977847,
      contact_id: "carlottalohr@example.com",
      ticket_id: 67,
      loc_locality: "San Francisco",
      near_del_cen:
        '[{"distance":{"text":"27.5 km","value":27473},"duration":{"text":"23 mins","value":1397},"status":"OK"},{"distance":{"text":"56.3 km","value":56338},"duration":{"text":"39 mins","value":2343},"status":"OK"},{"distance":{"text":"66.6 km","value":66615},"duration":{"text":"42 mins","value":2521},"status":"OK"}]',
      loc_long: -122.4681509,
      loc_area2: "San Francisco County",
      loc_zipcode: 94132,
      loc_area1: "California",
      category: "[F]",
      items: "Mangoes, Banana, Berries [L] Basket, Orange & Grape Basket [M]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Chester Marr",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.53661465,
      contact_id: "chestermarr@example.com",
      ticket_id: 66,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"35.2 km","value":35219},"duration":{"text":"31 mins","value":1831},"status":"OK"},{"distance":{"text":"25.3 km","value":25301},"duration":{"text":"28 mins","value":1658},"status":"OK"},{"distance":{"text":"42.9 km","value":42933},"duration":{"text":"32 mins","value":1902},"status":"OK"}]',
      loc_long: -122.0349526,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large],Cold-Pressed Juice 1 Gallon,Mangoes, Banana, Berries [L] Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Muoi Rikard",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.53703152,
      contact_id: "muoirikard@example.com",
      ticket_id: 65,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.7 km","value":34676},"duration":{"text":"30 mins","value":1804},"status":"OK"},{"distance":{"text":"24.8 km","value":24758},"duration":{"text":"27 mins","value":1631},"status":"OK"},{"distance":{"text":"42.6 km","value":42647},"duration":{"text":"31 mins","value":1850},"status":"OK"}]',
      loc_long: -122.0336652,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Ghee, Cottage Cheese (Paneer) Pack,Sour Cream [12 pc]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Ruthe Faas",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.53759301,
      contact_id: "ruthefaas@example.com",
      ticket_id: 64,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"39.9 km","value":39873},"duration":{"text":"30 mins","value":1823},"status":"OK"},{"distance":{"text":"25.6 km","value":25568},"duration":{"text":"28 mins","value":1650},"status":"OK"},{"distance":{"text":"42.4 km","value":42432},"duration":{"text":"30 mins","value":1824},"status":"OK"}]',
      loc_long: -122.032249,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Cold-Pressed Juice 1 Gallon,Orange & Grape Basket [M],Mangoes, Banana, Berries [L] Basket",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Thao Mcgrath",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.54093638,
      contact_id: "thaomcgrath@example.com",
      ticket_id: 63,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"40.1 km","value":40086},"duration":{"text":"30 mins","value":1824},"status":"OK"},{"distance":{"text":"24.4 km","value":24407},"duration":{"text":"27 mins","value":1607},"status":"OK"},{"distance":{"text":"42.6 km","value":42645},"duration":{"text":"30 mins","value":1825},"status":"OK"}]',
      loc_long: -122.0345986,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Sour Cream [12 pc]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Nicolette Bloyd",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.54033237,
      contact_id: "nicolettebloyd@example.com",
      ticket_id: 62,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"40.0 km","value":40015},"duration":{"text":"30 mins","value":1818},"status":"OK"},{"distance":{"text":"24.3 km","value":24336},"duration":{"text":"27 mins","value":1602},"status":"OK"},{"distance":{"text":"42.6 km","value":42574},"duration":{"text":"30 mins","value":1819},"status":"OK"}]',
      loc_long: -122.0342338,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Sour Cream [12 pc],10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Sharyn Hitchens",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.54131069,
      contact_id: "sharynhitchens@example.com",
      ticket_id: 61,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"40.1 km","value":40128},"duration":{"text":"30 mins","value":1826},"status":"OK"},{"distance":{"text":"24.4 km","value":24449},"duration":{"text":"27 mins","value":1610},"status":"OK"},{"distance":{"text":"42.7 km","value":42687},"duration":{"text":"30 mins","value":1827},"status":"OK"}]',
      loc_long: -122.0347273,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items:
        "Swiss Cheese Combo Pack,10 Gallon Organic Milk,10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Gabriel Claycomb",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.52771519,
      contact_id: "gabrielclaycomb@example.com",
      ticket_id: 60,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.6 km","value":33595},"duration":{"text":"27 mins","value":1634},"status":"OK"},{"distance":{"text":"23.7 km","value":23677},"duration":{"text":"24 mins","value":1461},"status":"OK"},{"distance":{"text":"38.2 km","value":38169},"duration":{"text":"30 mins","value":1777},"status":"OK"}]',
      loc_long: -122.0455635,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Butter & Cheese Combo Pack,Butter & Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Cheree Weaver",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.53001247,
      contact_id: "chereeweaver@example.com",
      ticket_id: 59,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.1 km","value":34063},"duration":{"text":"29 mins","value":1711},"status":"OK"},{"distance":{"text":"24.1 km","value":24145},"duration":{"text":"26 mins","value":1538},"status":"OK"},{"distance":{"text":"38.6 km","value":38638},"duration":{"text":"31 mins","value":1854},"status":"OK"}]',
      loc_long: -122.0447481,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items: "Orange & Grape Basket [M], Orange & Grape Basket [M]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Marielle Scherrer",
      cart_value: 200,
      loc_country: "United States",
      loc_lat: 37.5322161,
      contact_id: "mariellescherrer@example.com",
      ticket_id: 58,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.8 km","value":33846},"duration":{"text":"28 mins","value":1697},"status":"OK"},{"distance":{"text":"23.9 km","value":23929},"duration":{"text":"25 mins","value":1524},"status":"OK"},{"distance":{"text":"38.4 km","value":38421},"duration":{"text":"31 mins","value":1840},"status":"OK"}]',
      loc_long: -122.046454,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large], Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Emmanuel Leedy",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.53401979,
      contact_id: "emmanuelleedy@example.com",
      ticket_id: 57,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.1 km","value":33059},"duration":{"text":"28 mins","value":1699},"status":"OK"},{"distance":{"text":"23.1 km","value":23141},"duration":{"text":"25 mins","value":1526},"status":"OK"},{"distance":{"text":"37.6 km","value":37634},"duration":{"text":"31 mins","value":1842},"status":"OK"}]',
      loc_long: -122.0501339,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large], Pineapple, Watermelon, Grapes Basket [Medium] ",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Elizbeth Maselli",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.53184174,
      contact_id: "elizbethmaselli@example.com",
      ticket_id: 56,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.1 km","value":33111},"duration":{"text":"29 mins","value":1713},"status":"OK"},{"distance":{"text":"23.2 km","value":23193},"duration":{"text":"26 mins","value":1541},"status":"OK"},{"distance":{"text":"37.7 km","value":37686},"duration":{"text":"31 mins","value":1856},"status":"OK"}]',
      loc_long: -122.0514858,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Peaches & Apricot Basket [Large],Orange & Grape Basket [M],Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Karleen Wommack",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.53314347,
      contact_id: "karleenwommack@example.com",
      ticket_id: 55,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.0 km","value":32959},"duration":{"text":"28 mins","value":1679},"status":"OK"},{"distance":{"text":"23.0 km","value":23041},"duration":{"text":"25 mins","value":1506},"status":"OK"},{"distance":{"text":"37.5 km","value":37534},"duration":{"text":"30 mins","value":1822},"status":"OK"}]',
      loc_long: -122.0500803,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items:
        "Ghee, Cottage Cheese (Paneer) Pack,Sour Cream [12 pc],Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Tawny Steinhauser",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.52587731,
      contact_id: "tawnysteinhauser@example.com",
      ticket_id: 54,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.4 km","value":34359},"duration":{"text":"29 mins","value":1745},"status":"OK"},{"distance":{"text":"24.4 km","value":24441},"duration":{"text":"26 mins","value":1572},"status":"OK"},{"distance":{"text":"38.9 km","value":38934},"duration":{"text":"31 mins","value":1888},"status":"OK"}]',
      loc_long: -122.0421946,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] ,Peaches & Apricot Basket [Large],Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Digna Lazarus",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.52569862,
      contact_id: "dignalazarus@example.com",
      ticket_id: 53,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.5 km","value":33476},"duration":{"text":"28 mins","value":1670},"status":"OK"},{"distance":{"text":"23.6 km","value":23558},"duration":{"text":"25 mins","value":1498},"status":"OK"},{"distance":{"text":"38.1 km","value":38051},"duration":{"text":"30 mins","value":1814},"status":"OK"}]',
      loc_long: -122.0474839,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items: "Cold-Pressed Juice 1 Gallon",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Dimple Gladson",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.53527895,
      contact_id: "dimplegladson@example.com",
      ticket_id: 52,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.6 km","value":33627},"duration":{"text":"28 mins","value":1708},"status":"OK"},{"distance":{"text":"23.7 km","value":23709},"duration":{"text":"26 mins","value":1535},"status":"OK"},{"distance":{"text":"38.2 km","value":38201},"duration":{"text":"31 mins","value":1851},"status":"OK"}]',
      loc_long: -122.0461321,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items: "Peaches & Apricot Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Bobbi Barbosa",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.5339262,
      contact_id: "bobbibarbosa@example.com",
      ticket_id: 51,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.1 km","value":34092},"duration":{"text":"29 mins","value":1722},"status":"OK"},{"distance":{"text":"24.2 km","value":24175},"duration":{"text":"26 mins","value":1549},"status":"OK"},{"distance":{"text":"38.7 km","value":38667},"duration":{"text":"31 mins","value":1865},"status":"OK"}]',
      loc_long: -122.0443726,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] ,Pineapple, Watermelon, Grapes Basket [Medium] ,Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Han Place",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.5351173,
      contact_id: "hanplace@example.com",
      ticket_id: 50,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.7 km","value":33687},"duration":{"text":"29 mins","value":1717},"status":"OK"},{"distance":{"text":"23.8 km","value":23769},"duration":{"text":"26 mins","value":1545},"status":"OK"},{"distance":{"text":"38.3 km","value":38262},"duration":{"text":"31 mins","value":1861},"status":"OK"}]',
      loc_long: -122.0434928,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Orange & Grape Basket [M],Apple, Banana, Cherry Basket [Large],Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "See Mcduffy",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.52975722,
      contact_id: "seemcduffy@example.com",
      ticket_id: 49,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.1 km","value":34113},"duration":{"text":"29 mins","value":1723},"status":"OK"},{"distance":{"text":"24.2 km","value":24195},"duration":{"text":"26 mins","value":1550},"status":"OK"},{"distance":{"text":"38.7 km","value":38688},"duration":{"text":"31 mins","value":1866},"status":"OK"}]',
      loc_long: -122.0414007,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items:
        "Sour Cream [12 pc],Ghee, Cottage Cheese (Paneer) Pack,Butter & Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Orlando Brothers",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.53482804,
      contact_id: "orlandobrothers@example.com",
      ticket_id: 48,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"32.2 km","value":32249},"duration":{"text":"27 mins","value":1606},"status":"OK"},{"distance":{"text":"22.3 km","value":22332},"duration":{"text":"24 mins","value":1433},"status":"OK"},{"distance":{"text":"36.8 km","value":36824},"duration":{"text":"29 mins","value":1749},"status":"OK"}]',
      loc_long: -122.0560884,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Swiss Cheese Combo Pack,5 Gallon Farm Fresh Milk ",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Coralee Pardon",
      cart_value: 100,
      loc_country: "United States",
      loc_lat: 37.53595956,
      contact_id: "coraleepardon@example.com",
      ticket_id: 47,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.5 km","value":33516},"duration":{"text":"29 mins","value":1724},"status":"OK"},{"distance":{"text":"23.6 km","value":23599},"duration":{"text":"26 mins","value":1552},"status":"OK"},{"distance":{"text":"38.1 km","value":38091},"duration":{"text":"31 mins","value":1868},"status":"OK"}]',
      loc_long: -122.0490396,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Ghee, Cottage Cheese (Paneer) Pack,Swiss Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Renita Rodrigues",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.53084628,
      contact_id: "renitarodrigues@example.com",
      ticket_id: 46,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"34.0 km","value":34021},"duration":{"text":"28 mins","value":1691},"status":"OK"},{"distance":{"text":"24.1 km","value":24103},"duration":{"text":"25 mins","value":1518},"status":"OK"},{"distance":{"text":"38.6 km","value":38596},"duration":{"text":"31 mins","value":1834},"status":"OK"}]',
      loc_long: -122.0482564,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[F]",
      items:
        "Apple, Banana, Cherry Basket [Large],Cold-Pressed Juice 1 Gallon,Pineapple, Watermelon, Grapes Basket [Medium] ",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Chantell Stalvey",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.53011457,
      contact_id: "chantellstalvey@example.com",
      ticket_id: 45,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.9 km","value":33908},"duration":{"text":"28 mins","value":1680},"status":"OK"},{"distance":{"text":"24.0 km","value":23990},"duration":{"text":"25 mins","value":1507},"status":"OK"},{"distance":{"text":"38.5 km","value":38483},"duration":{"text":"30 mins","value":1823},"status":"OK"}]',
      loc_long: -122.0473552,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items:
        "Sour Cream [12 pc],Ghee, Cottage Cheese (Paneer) Pack,10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Thomasine Kenyon",
      cart_value: 200,
      loc_country: "United States",
      loc_lat: 37.52868941,
      contact_id: "thomasinekenyon@example.com",
      ticket_id: 44,
      loc_locality: "Newark",
      near_del_cen:
        '[{"distance":{"text":"33.3 km","value":33281},"duration":{"text":"28 mins","value":1686},"status":"OK"},{"distance":{"text":"23.4 km","value":23363},"duration":{"text":"25 mins","value":1514},"status":"OK"},{"distance":{"text":"37.9 km","value":37856},"duration":{"text":"31 mins","value":1830},"status":"OK"}]',
      loc_long: -122.0493186,
      loc_area2: "Alameda County",
      loc_zipcode: 94560,
      loc_area1: "California",
      category: "[M]",
      items: "Butter & Cheese Combo Pack,5 Gallon Farm Fresh Milk ",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Aubrey Sullen",
      cart_value: 250,
      loc_country: "United States",
      loc_lat: 37.68276746,
      contact_id: "aubreysullen@example.com",
      ticket_id: 43,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.1 km","value":31117},"duration":{"text":"24 mins","value":1443},"status":"OK"},{"distance":{"text":"40.3 km","value":40263},"duration":{"text":"34 mins","value":2065},"status":"OK"},{"distance":{"text":"60.0 km","value":59970},"duration":{"text":"40 mins","value":2421},"status":"OK"}]',
      loc_long: -122.1349883,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Machelle Sancho",
      cart_value: 50,
      loc_country: "United States",
      loc_lat: 37.67649244,
      contact_id: "machellesancho@example.com",
      ticket_id: 42,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.4 km","value":31381},"duration":{"text":"25 mins","value":1484},"status":"OK"},{"distance":{"text":"40.5 km","value":40527},"duration":{"text":"35 mins","value":2106},"status":"OK"},{"distance":{"text":"60.2 km","value":60235},"duration":{"text":"41 mins","value":2462},"status":"OK"}]',
      loc_long: -122.1240234,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items: "Assorted Fruits Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Edwin Carlson",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.67229747,
      contact_id: "edwincarlson@example.com",
      ticket_id: 41,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.3 km","value":29267},"duration":{"text":"25 mins","value":1487},"status":"OK"},{"distance":{"text":"38.4 km","value":38413},"duration":{"text":"35 mins","value":2109},"status":"OK"},{"distance":{"text":"58.1 km","value":58120},"duration":{"text":"41 mins","value":2465},"status":"OK"}]',
      loc_long: -122.119807,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items: "10 Gallon Organic Milk,10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Michelina Shouse",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.67329953,
      contact_id: "michelinashouse@example.com",
      ticket_id: 40,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.4 km","value":29396},"duration":{"text":"25 mins","value":1507},"status":"OK"},{"distance":{"text":"38.5 km","value":38542},"duration":{"text":"36 mins","value":2130},"status":"OK"},{"distance":{"text":"58.2 km","value":58250},"duration":{"text":"41 mins","value":2485},"status":"OK"}]',
      loc_long: -122.1205688,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items:
        "Ghee, Cottage Cheese (Paneer) Pack,Yogurt & Cheese Pack,Yogurt & Cheese Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Shu Harig",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.67324009,
      contact_id: "shuharig@example.com",
      ticket_id: 39,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.2 km","value":29194},"duration":{"text":"25 mins","value":1478},"status":"OK"},{"distance":{"text":"38.3 km","value":38340},"duration":{"text":"35 mins","value":2100},"status":"OK"},{"distance":{"text":"58.0 km","value":58047},"duration":{"text":"41 mins","value":2456},"status":"OK"}]',
      loc_long: -122.118541,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[F]",
      items:
        "Orange & Grape Basket [M],Assorted Fruits Basket,Orange & Grape Basket [M]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Brianne Ates",
      cart_value: 500,
      loc_country: "United States",
      loc_lat: 37.67350334,
      contact_id: "brianneates@example.com",
      ticket_id: 38,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.2 km","value":29189},"duration":{"text":"24 mins","value":1456},"status":"OK"},{"distance":{"text":"38.3 km","value":38335},"duration":{"text":"35 mins","value":2078},"status":"OK"},{"distance":{"text":"58.0 km","value":58042},"duration":{"text":"41 mins","value":2434},"status":"OK"}]',
      loc_long: -122.1158588,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[F]",
      items:
        "Cold-Pressed Juice 1 Gallon,Assorted Fruits Basket,Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 1,
      contact_name: "Tonie Pernell",
      cart_value: 100,
      loc_country: "United States",
      loc_lat: 37.67231445,
      contact_id: "toniepernell@example.com",
      ticket_id: 37,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.0 km","value":28957},"duration":{"text":"24 mins","value":1438},"status":"OK"},{"distance":{"text":"38.1 km","value":38103},"duration":{"text":"34 mins","value":2060},"status":"OK"},{"distance":{"text":"57.8 km","value":57811},"duration":{"text":"40 mins","value":2416},"status":"OK"}]',
      loc_long: -122.1173394,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items: "10 Gallon Organic Milk,10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Winifred Wardlaw",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.6708623,
      contact_id: "winifredwardlaw@example.com",
      ticket_id: 36,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"32.2 km","value":32227},"duration":{"text":"27 mins","value":1595},"status":"OK"},{"distance":{"text":"41.4 km","value":41373},"duration":{"text":"37 mins","value":2218},"status":"OK"},{"distance":{"text":"61.1 km","value":61081},"duration":{"text":"43 mins","value":2574},"status":"OK"}]',
      loc_long: -122.1183908,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items:
        "5 Gallon Farm Fresh Milk ,Butter & Cheese Combo Pack,Swiss Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Oneida Monette",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.66936765,
      contact_id: "oneidamonette@example.com",
      ticket_id: 35,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.0 km","value":28958},"duration":{"text":"24 mins","value":1437},"status":"OK"},{"distance":{"text":"38.1 km","value":38104},"duration":{"text":"34 mins","value":2059},"status":"OK"},{"distance":{"text":"57.8 km","value":57812},"duration":{"text":"40 mins","value":2415},"status":"OK"}]',
      loc_long: -122.1186054,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items: "5 Gallon Farm Fresh Milk ,Swiss Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Rosette Burch",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.66802583,
      contact_id: "rosetteburch@example.com",
      ticket_id: 34,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"29.3 km","value":29313},"duration":{"text":"25 mins","value":1529},"status":"OK"},{"distance":{"text":"38.5 km","value":38459},"duration":{"text":"36 mins","value":2151},"status":"OK"},{"distance":{"text":"58.2 km","value":58167},"duration":{"text":"42 mins","value":2507},"status":"OK"}]',
      loc_long: -122.1184337,
      loc_area2: "Alameda County",
      loc_zipcode: 94541,
      loc_area1: "California",
      category: "[M]",
      items:
        "10 Gallon Organic Milk,Swiss Cheese Combo Pack,Swiss Cheese Combo Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Reita Mangan",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.67463276,
      contact_id: "reitamangan@example.com",
      ticket_id: 33,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.6 km","value":31600},"duration":{"text":"25 mins","value":1488},"status":"OK"},{"distance":{"text":"40.7 km","value":40746},"duration":{"text":"35 mins","value":2110},"status":"OK"},{"distance":{"text":"60.5 km","value":60453},"duration":{"text":"41 mins","value":2466},"status":"OK"}]',
      loc_long: -122.1220171,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items:
        "Pineapple, Watermelon, Grapes Basket [Medium] , Apple, Banana, Cherry Basket [Large]",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Ruben Aldrete",
      cart_value: 450,
      loc_country: "United States",
      loc_lat: 37.67542249,
      contact_id: "rubenaldrete@example.com",
      ticket_id: 32,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.6 km","value":31607},"duration":{"text":"25 mins","value":1516},"status":"OK"},{"distance":{"text":"40.8 km","value":40753},"duration":{"text":"36 mins","value":2138},"status":"OK"},{"distance":{"text":"60.5 km","value":60461},"duration":{"text":"42 mins","value":2494},"status":"OK"}]',
      loc_long: -122.1299136,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items:
        "Orange & Grape Basket [M],Apple, Banana, Cherry Basket [Large],Cold-Pressed Juice 1 Gallon",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Delora Lipka",
      cart_value: 400,
      loc_country: "United States",
      loc_lat: 37.67628015,
      contact_id: "deloralipka@example.com",
      ticket_id: 31,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.5 km","value":31475},"duration":{"text":"25 mins","value":1483},"status":"OK"},{"distance":{"text":"40.6 km","value":40621},"duration":{"text":"35 mins","value":2106},"status":"OK"},{"distance":{"text":"60.3 km","value":60328},"duration":{"text":"41 mins","value":2462},"status":"OK"}]',
      loc_long: -122.129817,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[M]",
      items:
        "10 Gallon Organic Milk,Butter & Cheese Combo Pack,Yogurt & Cheese Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Barabara Gunnerson",
      cart_value: 350,
      loc_country: "United States",
      loc_lat: 37.67729064,
      contact_id: "barabaragunnerson@example.com",
      ticket_id: 30,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.4 km","value":31352},"duration":{"text":"24 mins","value":1467},"status":"OK"},{"distance":{"text":"40.5 km","value":40498},"duration":{"text":"35 mins","value":2089},"status":"OK"},{"distance":{"text":"60.2 km","value":60206},"duration":{"text":"41 mins","value":2445},"status":"OK"}]',
      loc_long: -122.1303856,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items:
        "Apple, Banana, Cherry Basket [Large],Mangoes, Banana, Berries [L] Basket,Pineapple, Watermelon, Grapes Basket [Medium] ",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Ophelia Conely",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.68011826,
      contact_id: "opheliaconely@example.com",
      ticket_id: 29,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.4 km","value":31411},"duration":{"text":"25 mins","value":1488},"status":"OK"},{"distance":{"text":"40.6 km","value":40557},"duration":{"text":"35 mins","value":2111},"status":"OK"},{"distance":{"text":"60.3 km","value":60265},"duration":{"text":"41 mins","value":2467},"status":"OK"}]',
      loc_long: -122.1312654,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[M]",
      items: "5 Gallon Farm Fresh Milk ,Sour Cream [12 pc]",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Noma Slavin",
      cart_value: 200,
      loc_country: "United States",
      loc_lat: 37.67826716,
      contact_id: "nomaslavin@example.com",
      ticket_id: 28,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.2 km","value":31194},"duration":{"text":"24 mins","value":1446},"status":"OK"},{"distance":{"text":"40.3 km","value":40340},"duration":{"text":"34 mins","value":2068},"status":"OK"},{"distance":{"text":"60.0 km","value":60048},"duration":{"text":"40 mins","value":2424},"status":"OK"}]',
      loc_long: -122.1304715,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[F]",
      items: "Cold-Pressed Juice 1 Gallon, Mangoes, Banana, Berries [L] Basket",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Cathey Lank",
      cart_value: 450,
      loc_country: "United States",
      loc_lat: 37.67815677,
      contact_id: "catheylank@example.com",
      ticket_id: 27,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.1 km","value":31114},"duration":{"text":"24 mins","value":1438},"status":"OK"},{"distance":{"text":"40.3 km","value":40260},"duration":{"text":"34 mins","value":2061},"status":"OK"},{"distance":{"text":"60.0 km","value":59968},"duration":{"text":"40 mins","value":2417},"status":"OK"}]',
      loc_long: -122.1294844,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[M]",
      items:
        "5 Gallon Farm Fresh Milk ,5 Gallon Farm Fresh Milk ,Ghee, Cottage Cheese (Paneer) Pack",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Galen Tezeno",
      cart_value: 450,
      loc_country: "United States",
      loc_lat: 37.6797956,
      contact_id: "galentezeno@example.com",
      ticket_id: 26,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"31.3 km","value":31285},"duration":{"text":"25 mins","value":1480},"status":"OK"},{"distance":{"text":"40.4 km","value":40431},"duration":{"text":"35 mins","value":2102},"status":"OK"},{"distance":{"text":"60.1 km","value":60139},"duration":{"text":"41 mins","value":2458},"status":"OK"}]',
      loc_long: -122.1305251,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[M]",
      items:
        "5 Gallon Farm Fresh Milk ,Yogurt & Cheese Pack,10 Gallon Organic Milk",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Lucy Pate",
      cart_value: 150,
      loc_country: "United States",
      loc_lat: 37.6788191,
      contact_id: "lucypate@example.com",
      ticket_id: 25,
      loc_locality: "San Lorenzo",
      near_del_cen:
        '[{"distance":{"text":"30.9 km","value":30944},"duration":{"text":"24 mins","value":1423},"status":"OK"},{"distance":{"text":"40.1 km","value":40090},"duration":{"text":"34 mins","value":2045},"status":"OK"},{"distance":{"text":"59.8 km","value":59798},"duration":{"text":"40 mins","value":2401},"status":"OK"}]',
      loc_long: -122.1288729,
      loc_area2: "Alameda County",
      loc_zipcode: 94580,
      loc_area1: "California",
      category: "[M]",
      items: "Ghee, Cottage Cheese (Paneer) Pack,Yogurt & Cheese Pack",
      status: "New",
    },
    {
      cart_value_bucket: 2,
      contact_name: "Karole Guynn",
      cart_value: 200,
      loc_country: "United States",
      loc_lat: 37.63373767,
      contact_id: "karoleguynn@example.com",
      ticket_id: 24,
      loc_locality: "Hayward",
      near_del_cen:
        '[{"distance":{"text":"24.5 km","value":24455},"duration":{"text":"19 mins","value":1165},"status":"OK"},{"distance":{"text":"35.2 km","value":35193},"duration":{"text":"30 mins","value":1828},"status":"OK"},{"distance":{"text":"54.9 km","value":54901},"duration":{"text":"36 mins","value":2184},"status":"OK"}]',
      loc_long: -122.0981133,
      loc_area2: "Alameda County",
      loc_zipcode: 94545,
      loc_area1: "California",
      category: "[F]",
      items: "Mangoes, Banana, Berries [L] Basket, Cold-Pressed Juice 1 Gallon",
      status: "New",
    },
    {
      cart_value_bucket: 3,
      contact_name: "Mandi Mendivil",
      cart_value: 300,
      loc_country: "United States",
      loc_lat: 37.69706897,
      contact_id: "mandimendivil@example.com",
      ticket_id: 23,
      loc_locality: "Daly City",
      near_del_cen:
        '[{"distance":{"text":"24.9 km","value":24914},"duration":{"text":"24 mins","value":1454},"status":"OK"},{"distance":{"text":"53.8 km","value":53779},"duration":{"text":"40 mins","value":2399},"status":"OK"},{"distance":{"text":"64.1 km","value":64056},"duration":{"text":"43 mins","value":2578},"status":"OK"}]',
      loc_long: -122.4612576,
      loc_area2: "San Mateo County",
      loc_zipcode: 94014,
      loc_area1: "California",
      category: "[M]",
      items: "Butter & Cheese Combo Pack,Butter & Cheese Combo Pack",
      status: "New",
    },
  ],
  mapData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 1,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4617431, 37.69414437],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 2,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4617243, 37.69400854],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 3,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4617189, 37.69387483],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 175,
          id: 4,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4620005, 37.69434175],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 5,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4618959, 37.69335059],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 6,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4620488, 37.69457309],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 7,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612576, 37.69099892],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 8,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4608821, 37.69101165],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 9,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4600291, 37.69094373],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 10,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4604261, 37.6917248],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 11,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4607748, 37.69237003],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 12,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4607694, 37.69444151],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 13,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4598843, 37.69413588],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 14,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4598843, 37.69324023],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 15,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4604636, 37.69321476],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 16,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.459262, 37.69324872],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 17,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4601471, 37.69298554],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 18,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4601471, 37.69259501],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 19,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.460131, 37.6923106],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 20,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4591815, 37.69151256],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 21,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4583447, 37.69300252],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 22,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4583501, 37.69229787],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 23,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4583286, 37.69191158],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 24,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4584466, 37.6913937],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 25,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4588865, 37.69117296],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 26,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4572825, 37.69362651],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 27,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4572664, 37.69298129],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 28,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4574757, 37.69278178],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 29,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4571806, 37.6924804],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 30,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4574435, 37.6921026],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 31,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4571645, 37.6921026],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 32,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4567676, 37.6930959],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 33,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4566603, 37.69357981],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 34,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4561399, 37.69406372],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 35,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4558717, 37.69453489],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 36,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4563599, 37.69450093],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 37,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4564511, 37.69452216],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 38,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4565369, 37.69448395],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 39,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4628884, 37.7040468],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 40,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4630278, 37.70369029],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 41,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4630868, 37.70342714],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 42,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4644789, 37.69975365],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 43,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4646211, 37.6997494],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 44,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4648249, 37.69973879],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 45,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4637467, 37.69932708],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 46,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4632478, 37.69935891],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 47,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4634919, 37.69897903],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 48,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4631298, 37.69895568],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 49,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.462191, 37.69714538],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 50,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4618316, 37.69675912],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 51,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.462132, 37.6964917],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 52,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4617994, 37.69616062],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 53,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612576, 37.69706897],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 54,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612522, 37.69694164],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 55,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612522, 37.69669545],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 56,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612254, 37.69644501],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 57,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4610108, 37.69733638],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 58,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.461279, 37.6893943],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 59,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612361, 37.68932214],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 60,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612308, 37.68927968],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 61,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4613702, 37.68891036],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 62,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612254, 37.6889231],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 63,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4611503, 37.68883395],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 64,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.461102, 37.68868113],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 65,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4612361, 37.68813351],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 66,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4613863, 37.68808257],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 67,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4615633, 37.68783635],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 68,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4614882, 37.68769626],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 69,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4614185, 37.68740759],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 70,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4613971, 37.68719108],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 71,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4605173, 37.68709769],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 72,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4601579, 37.68695335],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 73,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4600667, 37.68683873],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 74,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4599487, 37.68665194],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 75,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4597126, 37.68584535],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 76,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.460587, 37.7069795],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 77,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4604368, 37.707162],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 78,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4602276, 37.70739966],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 79,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4598789, 37.70809568],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 80,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4601471, 37.70829515],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 81,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4606675, 37.70860071],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 82,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4590153, 37.70852857],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 83,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4591118, 37.708397],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 84,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.459262, 37.70830788],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 85,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4606085, 37.7041614],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 86,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4602598, 37.70428872],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 87,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4598789, 37.70445425],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 88,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4522185, 37.70292208],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 89,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4525404, 37.70280324],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 90,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4529052, 37.70270986],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 91,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4531519, 37.70259739],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 92,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.453396, 37.7025125],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 93,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4524465, 37.70259739],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 94,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4518859, 37.7038643],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 95,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4533558, 37.70331255],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 96,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4547505, 37.70281172],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 97,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4530876, 37.70411047],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 98,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4531519, 37.70469617],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 99,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4548256, 37.70489989],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 100,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4551475, 37.70422931],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 101,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4566603, 37.7034229],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 102,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4564457, 37.70305789],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 103,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4519074, 37.70526489],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 104,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4533772, 37.70645324],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 105,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4531573, 37.70632167],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 106,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4528998, 37.70610098],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 107,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4538118, 37.70598639],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 108,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.453447, 37.70559168],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 109,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4529803, 37.70579116],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 110,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4566174, 37.70696677],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 111,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.456553, 37.70683945],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 112,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4571538, 37.70710682],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 113,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4574167, 37.70703892],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 114,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4576849, 37.70693706],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 115,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4580926, 37.70680125],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 116,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4582535, 37.70673335],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 117,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.458173, 37.70626225],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 118,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4583179, 37.70602883],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 119,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4582052, 37.70582936],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 120,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4579263, 37.70534977],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 121,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.459262, 37.70517576],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 122,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4592298, 37.70573174],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 123,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4597985, 37.70554924],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 124,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4598092, 37.7062665],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 125,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4402988, 37.71155445],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 126,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4410605, 37.71407522],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 127,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4351597, 37.71009457],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 128,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.3919654, 37.72908348],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 129,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.3911715, 37.72860405],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 130,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.3915255, 37.72790398],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 131,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4146998, 37.71073115],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 132,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4146622, 37.71051472],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 133,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4147159, 37.71034496],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 134,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4139541, 37.71029828],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 135,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4135947, 37.70976779],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 136,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4131227, 37.71101973],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 137,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4148768, 37.71168177],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 138,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4150217, 37.71211887],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 139,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4534363, 37.70843096],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 140,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4505663, 37.70675881],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 141,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4506092, 37.70967018],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 142,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4479055, 37.71079057],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 143,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4459207, 37.71126587],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 144,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4430668, 37.71202976],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 145,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4450302, 37.71212736],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 146,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4433994, 37.71365934],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 147,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4659193, 37.70492535],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 148,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4670351, 37.7032022],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 149,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.467314, 37.70301545],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 150,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4680221, 37.70307487],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 151,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4677324, 37.70392372],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 152,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4682474, 37.70485745],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 153,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4690413, 37.7048914],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 154,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696636, 37.70476407],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 155,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696636, 37.70413593],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 156,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696743, 37.70381337],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 157,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696636, 37.70293905],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 158,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696314, 37.70277777],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 159,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4696314, 37.70206473],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 160,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4690682, 37.70303667],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 161,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4683332, 37.69955204],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 162,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4045879, 37.71035345],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 163,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.405194, 37.71056564],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 164,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4054247, 37.71008609],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 165,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.405532, 37.70975082],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 166,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.406975, 37.71103671],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 167,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.40646, 37.71217404],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 168,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4069107, 37.71311615],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 169,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4098611, 37.70553651],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 170,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4325633, 37.71157992],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 171,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4309111, 37.71236077],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 172,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4290764, 37.71196186],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 173,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4283254, 37.71166479],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 174,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4287331, 37.71183454],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 175,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4267912, 37.71097729],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 176,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4276173, 37.71130831],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 177,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4269092, 37.7113847],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 178,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4257076, 37.71096032],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 179,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.424227, 37.71002667],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 180,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4229288, 37.70935614],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 181,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4225104, 37.70975506],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 182,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4218237, 37.71019643],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 183,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4212122, 37.71024735],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 184,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4204504, 37.71001818],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 185,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4192703, 37.70981448],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 186,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4179292, 37.70927126],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 187,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4182725, 37.70849037],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 188,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4180472, 37.70890628],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 189,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4175858, 37.7093137],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 190,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4170172, 37.7091694],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 191,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4160945, 37.70894023],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 192,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.412318, 37.71110461],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 193,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4120659, 37.71175815],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 194,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4099469, 37.71193639],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 195,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4102688, 37.71340472],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 196,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4092925, 37.71391396],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 197,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4107409, 37.71432984],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 198,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4126506, 37.71401581],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 199,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4041748, 37.71362539],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 200,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4050331, 37.71394791],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 201,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4048829, 37.71333682],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 202,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4064064, 37.7144232],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 203,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4082088, 37.71567082],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 204,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4073076, 37.71542469],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 205,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4063957, 37.71521251],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 206,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4039817, 37.71458446],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 207,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4057519, 37.71599333],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 208,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.403692, 37.71583207],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 209,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4045932, 37.71616307],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 210,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4026406, 37.71621399],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 211,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4031878, 37.71831875],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 212,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4019969, 37.7188619],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 213,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4431688, 37.71508096],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 214,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4425626, 37.71568355],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 215,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4431741, 37.71622672],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 216,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4446332, 37.71625642],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 217,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4441129, 37.7176398],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 218,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4444294, 37.72096659],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 219,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4439681, 37.72073745],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 220,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4431527, 37.72031312],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 221,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.442745, 37.71976998],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 222,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4445903, 37.72057621],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 223,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4441934, 37.72032161],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 224,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4435711, 37.71975301],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 225,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4413824, 37.71883644],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 226,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4409533, 37.71997366],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 227,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4405992, 37.72052529],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 228,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4399233, 37.72155215],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 229,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4422193, 37.72180674],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 230,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4416614, 37.72262992],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 231,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4412322, 37.7231391],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 232,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4402666, 37.72329185],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 233,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4395156, 37.72267235],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 234,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4433458, 37.72319002],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 235,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4449337, 37.72253657],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 236,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4429274, 37.72375859],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 237,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4426699, 37.72440354],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 238,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.441951, 37.72520972],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 239,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4718952, 37.7211448],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 240,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4719059, 37.72050831],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 241,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4709189, 37.72111934],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 242,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4682045, 37.72094113],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 243,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4681509, 37.71977847],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 244,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4664611, 37.72198496],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 245,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.464546, 37.72196799],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 246,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.457304, 37.72345309],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 247,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4572825, 37.72247717],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 248,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4568534, 37.72192555],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 249,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4505877, 37.72151821],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 250,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4509096, 37.72107691],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 251,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4511671, 37.72066956],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 252,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4514139, 37.71980392],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 253,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4527872, 37.71863276],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 254,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4536133, 37.71767375],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 255,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4540102, 37.71685052],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 256,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4537903, 37.71637524],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 257,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4538064, 37.71601454],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 258,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4537474, 37.71567082],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 259,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4541819, 37.71503004],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 260,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4529052, 37.71495365],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 261,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4523419, 37.71509793],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 262,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4514353, 37.71190244],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 263,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4506629, 37.71252203],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 264,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.449193, 37.71248808],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 265,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4509954, 37.71108763],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 266,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.451328, 37.7107651],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 267,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4525404, 37.70988238],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 268,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4313188, 37.72200193],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 269,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4316835, 37.72159458],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 270,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4367636, 37.73579951],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 271,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4375737, 37.73579103],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 272,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4392688, 37.73299523],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 273,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4383622, 37.73297402],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 274,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4391401, 37.73225278],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 275,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.438727, 37.73226126],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 276,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4455345, 37.72813734],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 277,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.446146, 37.72813734],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 278,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4464142, 37.72956292],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 279,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.4464893, 37.72919804],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 280,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.2554463, 37.43228136],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 281,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.2569644, 37.43315035],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 282,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.2571254, 37.43409173],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 283,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.2575814, 37.4341897],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 284,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.2545612, 37.43007479],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 285,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0493186, 37.52868941],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 286,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0473552, 37.53011457],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 287,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0482564, 37.53084628],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 288,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0490396, 37.53595956],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 289,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0560884, 37.53482804],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 290,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0414007, 37.52975722],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 291,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0434928, 37.5351173],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 292,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0443726, 37.5339262],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 293,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0461321, 37.53527895],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 294,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0474839, 37.52569862],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 295,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0421946, 37.52587731],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 296,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0500803, 37.53314347],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 297,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0514858, 37.53184174],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 298,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0501339, 37.53401979],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 299,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.046454, 37.5322161],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 300,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0447481, 37.53001247],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 301,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0455635, 37.52771519],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 302,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0347273, 37.54131069],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 303,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0342338, 37.54033237],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 304,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0345986, 37.54093638],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 305,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.032249, 37.53759301],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 306,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0336652, 37.53703152],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 307,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0349526, 37.53661465],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 308,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0342982, 37.53745689],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 309,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0356607, 37.53741436],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 310,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0376027, 37.53858838],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 311,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0360792, 37.53438563],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 312,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0269489, 37.53605315],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 313,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1647179, 37.69974728],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 314,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1645355, 37.69940772],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 315,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1619284, 37.6991955],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 316,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1615636, 37.69668271],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 317,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1607482, 37.69624127],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 318,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1625721, 37.6961394],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 319,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1618855, 37.69618184],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 320,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1609199, 37.70074897],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 321,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1598685, 37.69923794],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 322,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1602547, 37.69992555],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 323,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1601689, 37.69815134],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 324,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1602654, 37.69708171],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 325,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1584845, 37.69577435],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 326,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1598899, 37.69562154],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 327,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1583021, 37.69485749],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 328,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1598256, 37.69500181],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 400,
          id: 329,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1600938, 37.69489145],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 330,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1600616, 37.69460281],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 331,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.159096, 37.69459432],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 332,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1582377, 37.69464526],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 333,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1582699, 37.69671667],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 334,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1586132, 37.6966912],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 335,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1593213, 37.6966148],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 336,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1600509, 37.69657235],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 337,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1589243, 37.69646199],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 338,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1578944, 37.69431416],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 339,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1577871, 37.69400854],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 340,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1585703, 37.69433114],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 341,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1592677, 37.69431416],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 342,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1580768, 37.69808343],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 343,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.157948, 37.69742977],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 344,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.157433, 37.69318504],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 345,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1577013, 37.69540931],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 346,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1597826, 37.69298129],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 347,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1573043, 37.69712415],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 348,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0982528, 37.6319109],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 349,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.0981133, 37.63373767],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 350,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1288729, 37.6788191],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 351,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1305251, 37.6797956],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 352,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1294844, 37.67815677],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 353,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1304715, 37.67826716],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 354,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1312654, 37.68011826],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 355,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1303856, 37.67729064],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 356,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.129817, 37.67628015],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 357,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1299136, 37.67542249],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 358,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1220171, 37.67463276],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 359,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1216685, 37.67477287],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 400,
          id: 360,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.121647, 37.67433554],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 361,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1143246, 37.66576677],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 362,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1141207, 37.66552048],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 363,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1132839, 37.66515529],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 500,
          id: 364,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1141958, 37.66479009],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 365,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1141851, 37.66392381],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 350,
          id: 366,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1156871, 37.66249696],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 367,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1137667, 37.66263286],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 150,
          id: 368,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1121252, 37.66360107],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 369,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1118677, 37.66293012],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 370,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1184337, 37.66802583],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 371,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1186054, 37.66936765],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 372,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1183908, 37.6708623],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 373,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1173394, 37.67231445],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 300,
          id: 374,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1158588, 37.67350334],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 375,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.118541, 37.67324009],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 376,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1205688, 37.67329953],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 377,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.119807, 37.67229747],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 378,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1240234, 37.67649244],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 379,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1349883, 37.68276746],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 380,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1335399, 37.68190988],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 381,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1562743, 37.69311713],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 382,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1535492, 37.69313411],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 150,
          id: 383,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1532702, 37.69260774],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 384,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1557593, 37.69242946],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 385,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1535921, 37.69134276],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 500,
          id: 386,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1550083, 37.69124937],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 450,
          id: 387,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1534312, 37.6905447],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 350,
          id: 388,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1538925, 37.69000134],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 50,
          id: 389,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1549118, 37.68675807],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 250,
          id: 390,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1513712, 37.68838821],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 391,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.151264, 37.68720806],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 300,
          id: 392,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1477127, 37.68564582],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 100,
          id: 393,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1501482, 37.6856628],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 100,
          id: 394,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1511352, 37.68421939],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 50,
          id: 395,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1482277, 37.6842109],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 250,
          id: 396,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1489143, 37.68916082],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 200,
          id: 397,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1505558, 37.68870235],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 398,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1501696, 37.68660524],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[F]",
          cart_value: 450,
          id: 399,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.148056, 37.68678354],
        },
      },
      {
        type: "Feature",
        properties: {
          category: "[M]",
          cart_value: 200,
          id: 400,
        },
        geometry: {
          type: "Point",
          coordinates: [-122.1474552, 37.68349768],
        },
      },
    ],
  };

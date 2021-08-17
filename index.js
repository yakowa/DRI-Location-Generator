// This example adds a user-editable rectangle to the map.
// When the user changes the bounds of the rectangle,
// an info window pops up displaying the new bounds.
let rectangle;
let map;
let infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 53.22081758189024, lng: -7.294727715731177 },
    zoom: 7,
  });
  const bounds = {
    north: 55.41184958673504,
    south: 51.40071392344133,
    east: -5.405079278231177,
    west: -10.692642816585822,
  };
  // Define the rectangle and set its editable property to true.
  rectangle = new google.maps.Rectangle({
    bounds: bounds,
    editable: true,
    draggable: true,
  });
  rectangle.setMap(map);
  // Add an event listener on the rectangle.
  rectangle.addListener("bounds_changed", showNewRect);
  // Define an info window on the map.
  infoWindow = new google.maps.InfoWindow();


  // Setting up event listen for selection
  let relCountry = document.querySelector('#relCountry');
  relCountry.addEventListener('keyup', updateRelCountry)

  // Setting the default value of regionOrCity
  window.regionOrCity = "region";  
  // Setting up event listen for regionOrCity selection
  let selection = document.querySelector('#regionOrCity');
  let selection2 = document.querySelector('#regionOrCity2');
  let regionOrCityText = document.querySelector('#regionOrCityText');
  selection.addEventListener('change', function() {
    let value = this.checked;

    if (value) {
      window.regionOrCity = "city";
      regionOrCityText.innerHTML = "<strong>Step 2:</strong> Enter relevant city name";
      dublin()
    }

    updateCode();
  });

  selection2.addEventListener('change', function() {
    let value = this.checked;

    if (value) {
      window.regionOrCity = "region";
      regionOrCityText.innerHTML = "<strong>Step 2:</strong> Enter relevant region";
      ireland()
    }

    updateCode();
  });

  updateRelCountry()

  updateCode()
}

/** Show the new coordinates for the rectangle in an info window. */
function showNewRect() {
  const ne = rectangle.getBounds().getNorthEast();
  const sw = rectangle.getBounds().getSouthWest();

  e = ne.lng() // North
  w = sw.lng() // South
  n = ne.lat() // East
  s = sw.lat() // West

  const contentString =
    "<b>Rectangle moved.</b><br>" +
    "New north-east corner: " +
    n +
    ", " +
    e +
    "<br>" +
    "New south-west corner: " +
    s +
    ", " +
    w;
  // Set the info window's content and position.
  infoWindow.setContent(contentString);
  infoWindow.setPosition(ne);
  infoWindow.open(map);

  var xhttpGeonames = new XMLHttpRequest();
  xhttpGeonames.addEventListener('load', function() { if (this.readyState == 4 && this.status == 200) {
    if (typeof callBackLogainm === 'function') { callBackGeonames(xhttpGeonames.responseText); }
    }
    else { console.error('[Error] API request failed.'); }
  });

  xhttpGeonames.open("GET", `https://jacobem.com/app/dri-location/api-2?n=${n}&s=${s}&e=${e}&w=${w}`, true);
  xhttpGeonames.send();

  updateCode()
}

function updateRect(n, s, e, w) {
  rectangle.setBounds({
    north: n,
    south: s,
    east: e,
    west: w,
  })

  updateCode()
}







// Updates the code's text
function updateCode() {
  const ne = rectangle.getBounds().getNorthEast();
  const sw = rectangle.getBounds().getSouthWest(); 

  country = getRelCountry();
  
  if (!(country == "")) {
    e = ne.lng() // North
    w = sw.lng() // South
    n = ne.lat() // East
    s = sw.lat() // West

    // console.log({n, e, s, w})
    if (window.regionOrCity == "region") {
      result.innerText = `<dcterms:spatial>name=${country}; northlimit=${n}; eastlimit=${e}; southlimit=${s}; westlimit=${w};</dcterms:spatial>`;
    }
    else {
      result.innerText = `<dcterms:spatial>name=${country}; north=${n}; east=${e};</dcterms:spatial>`;
    }

    result.innerText += window.logainm || "";
    result.innerText += window.geonames || "";
  }
  else {
    let result = document.querySelector('#result');
    result.innerText = `Waiting for you to input the relevant region...`;
  }
}

// Gets Rel Country Value
function getRelCountry() {
  let relCountryID = document.querySelector('#relCountry');
  return relCountryID.value;
}

function updateRelCountry() {
  country = getRelCountry();

  var xhttp = new XMLHttpRequest();
  xhttp.addEventListener('load', function() { if (this.readyState == 4 && this.status == 200) {
    if (typeof callBackLogainm === 'function') { callBackLogainm(xhttp.responseText); }
    }
    else { console.error('[Error] API request failed.'); }
  });

  xhttp.open("GET", `https://jacobem.com/app/dri-location/api?q=${country}`, true);
  xhttp.send();
}



function callBackLogainm(rawData) {
  try {
    let data = JSON.parse(rawData);
    let id = data['results']['0']['id']

    window.logainm = `\n\n<dcterms:spatial>http://data.logainm.ie/place/${id}</dcterms:spatial>`;
    updateCode();
  }
  catch { console.error('NOT A LOCATION IN LOGAINM'); }
}

function callBackGeonames(rawData) {
  try {
    let data = JSON.parse(rawData);
    let id = data['geonames']['0']['geonameId']

    window.geonames = `\n\n<dcterms:spatial>http://sws.geonames.org/${id}/</dcterms:spatial>`;
    updateCode();
  }
  catch { console.error('NOT A LOCATION IN GEONAMES'); }
}


// Cork
function cork() {
  updateRect(52.283264022036064, 51.410993826424736, -7.860523614168677, -9.484146722835822)
}
// Dublin
function dublin() {
  updateRect(53.644106944990966, 53.16746368032596, -6.053272637606177, -6.550797113460822)
}
// Ireland
function ireland() {
  updateRect(55.41184958673504, 51.40071392344133, -5.405079278231177, -10.692642816585822)
}


// Copies the code field
function getCode() {
  // Extracting pre's innerText as select() is not a function on non visible elements
  let resultPre = document.querySelector("#result");
  const textArea = document.createElement('textarea');
  textArea.textContent = resultPre.innerText;
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}


// Removes Error Alert Messages
function removeX() {
  setTimeout(function () {
    document.querySelectorAll('#map > div')[1].remove()
  }, 2500
  );
}
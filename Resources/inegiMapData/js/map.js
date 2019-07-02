//My Map:


function Color(state) {
  if (state == "Estado de Mexico") {
      return 'blue'
  } else if (state == "Ciudad de Mexico") {
      return 'pink'
  } else if (state == "Morelos") {
      return 'orange'
  } else if (state == "Puebla") {
      return 'red'
  } else if (state == "Queretaro") {
      return 'indigo'
  } else if (state == "Hidalgo") {
      return 'cyan'
  } else if (state == "Tlaxcala") {
      return 'green'
  } else {
      return 'black'
  }
};

//----------------------------------------------------//
// Create Map Layers
//----------------------------------------------------//
  var highContrastMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.high-contrast',
      accessToken: API_KEY
  });

  var streetMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: API_KEY
  });

  var darkMap = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.dark',
      accessToken: API_KEY
  });

  var satellite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.satellite',
      accessToken: API_KEY
  });


  var baseLayers = {
      "High Contrast": highContrastMap,
      "Street": streetMap,
      "Dark": darkMap,
      "Satellite": satellite
  };

  var map = L.map("mapa", {
    center: [19.58867, -98.56972],
    zoom: 8,
    layers: [streetMap]
  });

  L.control.layers(baseLayers).addTo(map);

  var legend = L.control({ position: 'bottomright' });

  legend.onAdd = function (mymap) {

      var div = L.DomUtil.create('div', 'info legend'),
          colorStates = ["Puebla", "Estado de Mexico", "Tlaxcala", "Queretaro", "Ciudad de Mexico", "Hidalgo", "Morelos"],
          labels = [];

      div.innerHTML += "<h4 style='margin:4px'>Estados</h4>"

      for (var i = 0; i < colorStates.length; i++) {
        div.innerHTML +=
            '<i style="background:' + Color(colorStates[i]) + '"></i> ' +
            colorStates[i] + (colorStates[i] ? '&ndash;' + '<br>' : '+');
      }

      return div;
  };
  legend.addTo(map);
//Finished creating our Layers


//----------------------------------------------------//
// Add states to our map
//----------------------------------------------------//
//Let's draw our seven states with its unique styles!
L.geoJson(cdmxjson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "pink",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(hidjson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "cyan",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(mexicojson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "blue",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(morjson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "orange",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(qtojson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "indigo",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(tlaxjson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "green",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);

L.geoJson(puejson, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: "red",
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
}).addTo(map);


//----------------------------------------------------//
// Create a new marker cluster group
//----------------------------------------------------//
var markers = L.markerClusterGroup();

//markers.addLayer(L.marker(19.58867, -98.56972));

markers.addLayer(L.marker([19.58867, -98.56972])
.bindPopup("Test"));

markers.addLayer(L.marker([19.58867, -98.56972])
.bindPopup("Test"));

markers.addLayer(L.marker([19.58867, -98.56972])
.bindPopup("Test"));

// Add our marker cluster layer to the map
map.addLayer(markers);
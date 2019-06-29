//My Map:
var map = L.map("mapa", {
    center: [19.58867, -98.56972],
    zoom: 8
});

/*L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
}).addTo(map);*/

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: API_KEY
}).addTo(map);


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

// Create a new marker cluster group
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
$(document).ready(function () {
  var map_geo_location = L.map("map_geo_location").setView(
    [36.542467, 52.684422],
    11
  );
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: "Vionna.ir",
      maxZoom: 18,
      id: "mapbox/streets-v11",
      tileSize: 512,
      zoomOffset: -1,
      accessToken:
        "pk.eyJ1IjoiYWxpYW1pcmVzbWFlaWxpIiwiYSI6ImNraTlhamVlNDBkdGoyemxjNXFpOWc4Y3EifQ.8FDdahQVEsXNqriSVT42Ag",
    }
  ).addTo(map_geo_location);
  map_geo_location.addControl(new L.Control.Fullscreen());
  var marker_map_1 = null;
  function onMapClick(e) {
    if (marker_map_1 != null) map_geo_location.removeLayer(marker_map_1);

    marker_map_1 = L.marker([e.latlng.lat, e.latlng.lng]).addTo(
      map_geo_location
    );
    marker_map_1.bindPopup("<b>نقطه مورد نظر</b>").openPopup();
    $("#sup_main_Latlong").val(e.latlng.lat + "," + e.latlng.lng);
  }
  map_geo_location.on("click", onMapClick);

  function onLocationFound(e) {
    // if position defined, then remove the existing position marker and accuracy circle from the map
    alert("موقعیت فعلی یافت شد");
    console.log("location found");
    console.log(e);
    //if (current_position) {
    //    map.removeLayer(current_position);
    //    map.removeLayer(current_accuracy);
    //}

    //var radius = e.coords.accuracy / 10;
    //const latlng = {
    //    lat: e.coords.latitude,
    //    lng: e.coords.longitude
    //};

    //current_position = L.marker(latlng).addTo(map);
    //current_accuracy = L.circle(latlng, radius).addTo(map);
    //map.setView(latlng);
  }

  function onLocationError(e) {
    console.error("Location found error", e);
    alert(
      "مشکل در دریافت خودکار موقعیت مکانی ، لطفا موقعیت مکانی خود را انتخاب نمایید"
    );
  }

  navigator.geolocation.watchPosition(onLocationFound, onLocationError, {
    maximumAge: 10000,
    timeout: 2000,
  });
});

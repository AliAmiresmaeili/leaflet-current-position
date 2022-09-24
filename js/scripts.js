$(document).ready(function () {
  var map_geo_location = L.map("map_geo_location").setView(
    [36.542467, 52.684422],
    11
  );
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution: "Ali Amiresmaeili",
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
  var current_accuracy = null;
  function onMapClick(e) {
    if (marker_map_1 != null) map_geo_location.removeLayer(marker_map_1);

    marker_map_1 = L.marker([e.latlng.lat, e.latlng.lng]).addTo(
      map_geo_location
    );
    marker_map_1.bindPopup("<b>نقطه مورد نظر</b>").openPopup();
    $("#map_latlng").val(e.latlng.lat + "," + e.latlng.lng);
  }
  map_geo_location.on("click", onMapClick);

  function onLocationFound(e) {
    // alert("موقعیت فعلی یافت شد");
    console.log("location found", e);

    if (marker_map_1 != null) map_geo_location.removeLayer(marker_map_1);
    if (current_accuracy != null)
      map_geo_location.removeLayer(current_accuracy);

    var radius = e.coords.accuracy / 10;
    var latlng = {
      lat: e.coords.latitude,
      lng: e.coords.longitude,
    };

    $("#map_latlng").val(latlng.lat + "," + latlng.lng);

    marker_map_1 = L.marker([latlng.lat, latlng.lng]).addTo(map_geo_location);
    marker_map_1.bindPopup("<b>مکان شما</b>").openPopup();

    current_accuracy = L.circle(latlng, radius).addTo(map_geo_location);

    map_geo_location.setView(latlng);
  }

  function onLocationError(e) {
    console.error("Location not found error", e);
    // alert(
    //   "مشکل در دریافت خودکار موقعیت مکانی ، لطفا موقعیت مکانی خود را انتخاب نمایید"
    // );
  }

  // navigator.geolocation.watchPosition(onLocationFound, onLocationError, {
  //   // maximumAge: 100000,
  //   // timeout: 200000,
  //   //enableHighAccuracy: true,
  // });

  navigator.geolocation.getCurrentPosition(
    onLocationFound,
    onLocationError,
    {}
  );
});

$(document).ready(function () {
  mapboxgl.accessToken = "pk.eyJ1IjoiaXRzZ29vZHRvYmVncmFudCIsImEiOiJjazJvN2RmcXQxMGxlM2hvM3ozMDhxYzdjIn0.YgXtz5WOceD5ec0B1AP2SA";

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [-122.335167, 47.608013], // starting position [lng, lat]
    zoom: 15 // starting zoom
  });

  $("#add-place").on("click", function () {
    var popup = new mapboxgl.Popup({
        className: 'popup'
      })
      .setLngLat([-122.318870, 47.613760])
      .setHTML("<p>Big Mario's Pizza</p><p>Capitol Hill</p><p>Food</p>")
      .setMaxWidth("300px")
      .addTo(map);

    var marker = new mapboxgl.Marker()
      .setLngLat([-122.318870, 47.613760])
      .setPopup(popup)
      .addTo(map);
  })
})
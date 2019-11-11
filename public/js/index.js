$(document).ready(function () {
  // $('.modal').modal();
  $("#helpbtn").on("click", function() {
    $("#app-info").modal("show");
  });

  $("#addbtn").on("click", function() {
    $("#display-form").modal("show");
  });

  mapboxgl.accessToken = "pk.eyJ1IjoibWFkZWxlaW5lcHJhayIsImEiOiJjazJvNmRpbWQwODE4M2lzN2F3MGNwOWJ3In0.Q5zwBkUwvENZvXIxLk1Dng";
  var lat = 0;
  var long = 0;
  var placeName = "";
  // console.log("hi");
  var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [-122.335167, 47.608013], // starting position [lng, lat]
      zoom: 15// starting zoom
  });

  var geocoder = new MapboxGeocoder({ // Initialize the geocoder
      accessToken: mapboxgl.accessToken, // Set the access token
      placeholder: 'Search for places in Seattle',
      mapboxgl: mapboxgl, // Set the mapbox-gl instance
      marker: false, // Do not use the default marker style
      // marker: {
      //     color: 'orange'
      // },
  });
  geocoder.on('results', function (results) {

      map.once('moveend', function () {
          console.log(results);
          var place = results.features[0];
          long = place.center[0];
          lat = place.center[1];
          placeName = place.text;

          console.log(long);
          console.log(lat);
          console.log(placeName);
      })
  });

  // Add the geocoder to the map
  // map.addControl(geocoder);
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  $("#display-form").on("click", function () {
      $("#form-modal").modal("show");
  });
  
  $("#add-place").on("click", function () {
      var recommendation = $("#recommendation-input").val().trim();
      var category = $("#category-input").children("option:selected").val();
      console.log(recommendation);
      console.log(category);

      var popup = new mapboxgl.Popup({ className: 'popup' })
          .setLngLat([long, lat])
          .setHTML("<h5>" + placeName + "</h5><h6>" + category + "</h6><p>" + recommendation + "</p>")
          .setMaxWidth("300px")
          .addTo(map);

      var marker = new mapboxgl.Marker()
          .setLngLat([long, lat])  .setPopup(popup)
          .addTo(map);
  })

  // $('#web-category').formSelect();

})


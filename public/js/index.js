$(document).ready(function () {
  // $('.modal').modal();
  $("#helpbtn").on("click", function () {
    $("#app-info").modal("show");
  });

  $("#addbtn").on("click", function () {
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
    placeholder: '',
    // limit results to Australia
    countries: 'us',
    place: "Seattle",

    // further limit results to the geographic bounds representing the region of
    // Seattle
    bbox: [-122.50250090764501,47.5305447461121,-122.10674987605402,47.73564476982446],

    proximity:[-122.335167, 47.608013],
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

    //   name: "FOB Poke",
    // lat: 47.613767,
    // lng: -122.3459567,
    // recommendation: "Make sure to add the mango salsa!",
    // photo: "https://lh5.googleusercontent.com/p/AF1QipOavwc-5eHngYoSwJ_X9B5H0cvTZMscT7V2e0hy=w408-h272-k-no",
    // category: "food"

    var newPlace = {
      name: placeName,
      lat: lat,
      lng: long,
      recommendation: recommendation,
      photo: "",
      category: category
    }
    console.log(newPlace);

    $.post("/api/new", newPlace)
      .then(function () {
        var popup = new mapboxgl.Popup({ className: 'popup' })
          .setLngLat([newPlace.lng, newPlace.lat])
          .setHTML("<h5>" + newPlace.name + "</h5><h6>" + newPlace.category + "</h6><p>" + newPlace.recommendation + "</p>")
          .setMaxWidth("300px")
          .addTo(map);

        var marker = new mapboxgl.Marker()
          .setLngLat([newPlace.lng, newPlace.lat]).setPopup(popup)
          .addTo(map);
      })
  })

  $.get("/api/places", function (data) {
    if (data.length !== 0) {
      for (var i = 0; i < data.length; i++) {
        var popup = new mapboxgl.Popup({ className: 'popup' })
          .setLngLat([data[i].lng, data[i].lat])
          .setHTML("<h5>" + data[i].name + "</h5><h6>" + data[i].category + "</h6><p>" + data[i].recommendation + "</p>")
          .setMaxWidth("300px")
          .addTo(map);

        var marker = new mapboxgl.Marker()
          .setLngLat([data[i].lng, data[i].lat]).setPopup(popup)
          .addTo(map);
      }
    }
  })

  // $('#web-category').formSelect();

})


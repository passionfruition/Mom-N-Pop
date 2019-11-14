$(document).ready(function () {
  
  // Displays app info modal
  $("#helpbtn").on("click", function () {
    $("#app-info").modal("show");
  });

  // Displays form modal
  $("#addbtn").on("click", function () {
    $("#display-form").modal("show");
  });

  // Initialize MapBox map
  mapboxgl.accessToken = "pk.eyJ1IjoibWFkZWxlaW5lcHJhayIsImEiOiJjazJvNmRpbWQwODE4M2lzN2F3MGNwOWJ3In0.Q5zwBkUwvENZvXIxLk1Dng";
  var lat = 0;
  var long = 0;
  var placeName = "";
  var markerArray = [];
  var initialDisplay = true;
  var formisValid = false;

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [-122.335167, 47.608013], 
    zoom: 15
  });

  // Initialize geocoder
  var geocoder = new MapboxGeocoder({ 
    accessToken: mapboxgl.accessToken, 
    placeholder: " ",
    // limit results to Seattle area
    countries: 'us',
    place: "Seattle",
    bbox: [-122.50250090764501, 47.5305447461121, -122.10674987605402, 47.73564476982446],
    proximity: [-122.335167, 47.608013],
    types: "poi",
    mapboxgl: mapboxgl,
    marker: false
  });

  geocoder.on('results', function (results) {
    map.once('moveend', function () {
      var place = results.features[0];
      long = place.center[0];
      lat = place.center[1];
      placeName = place.text;
    })
  });

  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

  // Check form validity
  function checkFormValidity() {
    var recommendationInput = $("#recommendation-input").val().trim();
    var categoryInput = $("#category-input").children("option:selected").val();
    var locationInput = $(".mapboxgl-ctrl-geocoder--input").val();
    if (recommendationInput == "") {
      $("#recommendation-input").addClass("is-invalid");
    } else {
      $("#recommendation-input").addClass("is-valid");
    }
    if (categoryInput == "") {
      $("#category-input").addClass("is-invalid");
    } else {
      $("#category-input").addClass("is-valid");
    }
    // if(locationInput == "") {
    //   $(".mapboxgl-ctrl-geocoder--input").addClass("is-invalid");
    // } else {
    //   $(".mapboxgl-ctrl-geocoder--input").addClass("is-valid");
    // }
    if (recommendationInput == "" || categoryInput == "" || locationInput == "") {
      formisValid = false;
    } else {
      formisValid = true;
    }
  }

  function submitValidForm() {
    var recommendation = $("#recommendation-input").val().trim();
    var category = $("#category-input").children("option:selected").val();

    // Clear form after user submits
    $(".mapboxgl-ctrl-geocoder--input").val("");
    $("#recommendation-input").val("");
    $("#category-input").prop("selectedIndex", 0);

    var newPlace = {
      name: placeName,
      lat: lat,
      lng: long,
      recommendation: recommendation,
      photo: "",
      category: category
    }
    console.log(newPlace);

    // Displays new marker
    $.post("/api/new", newPlace)
      .then(function () {
        var popup = new mapboxgl.Popup({ className: 'popup' })
          .setLngLat([newPlace.lng, newPlace.lat])
          .setHTML("<h5>" + newPlace.name + "</h5><h6>" + newPlace.category + "</h6><p>" + newPlace.recommendation + "</p>")
          .setMaxWidth("300px")
          .addTo(map);

        var newMarker = new mapboxgl.Marker({ color: 'rgb(0,0,0)' })
          .setLngLat([newPlace.lng, newPlace.lat]).setPopup(popup)
          .addTo(map);
        markerArray.push(newMarker);
        // console.log(markerArray);
      })
  }
  // When user submits new place
  $("#add-place").on("click", function (event) {
    event.preventDefault();
    checkFormValidity();
    if(formisValid) {
      submitValidForm();
      // Remove form validation classes
      $("#recommendation-input").removeClass("is-invalid");
      $("#category-input").removeClass("is-invalid");
      $(".mapboxgl-ctrl-geocoder--input").removeClass("is-invalid");
      $("#recommendation-input").removeClass("is-valid");
      $("#category-input").removeClass("is-valid");
      $(".mapboxgl-ctrl-geocoder--input").removeClass("is-valid");
      $("#display-form").modal("hide");
    } 
  })

  // Displays markers
  function displayPoints(type) {
    $.get("/api/" + type, function (data) {
      // First remove markers
      markerArray.forEach((marker) => marker.remove());
      markerArray = [];

      if (data.length !== 0) {
        for (var i = 0; i < data.length; i++) {
          var popup = new mapboxgl.Popup({ className: 'popup' })
            .setLngLat([data[i].lng, data[i].lat])
            .setHTML("<h5>" + data[i].name + "</h5><h6>" + data[i].category + "</h6><p>" + "<img style='object-fit: cover;' src='" + data[i].photo + "' alt='place image' height='200' width='200'><br>" + data[i].recommendation + "</p>")
            .setMaxWidth("300px")
            .addTo(map);
          
          var marker = new mapboxgl.Marker({ color: 'rgb(0,0,0)' })
            .setLngLat([data[i].lng, data[i].lat]).setPopup(popup)
            .addTo(map);
              markerArray.push(marker);     
        }
      }
    })
  }

  // Initial render
  displayPoints("places");

  // Displays only drink places
  $("#drinksbtn").on("click", function () {
    displayPoints("drinks");
  })

  // Displays only food places
  $("#foodbtn").on("click", function () {
    displayPoints("food");
  })

  // Displays all places
  $("#allbtn").on("click", function () {
    displayPoints("places");
  })

})


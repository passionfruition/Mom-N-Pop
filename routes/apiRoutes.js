var db = require("../models");
require("dotenv").config();
var yelp = require("yelp-fusion");

const apiKey = process.env.DB_YELPKEY;
var searchRequest = {
  term: "",
  latitude: 0,
  longitude: 0,
  limit: 1
};

var image;

const client = yelp.client(apiKey);


module.exports = function(app) {
  // Get all examples
  app.get("/api/places", function(req, res) {
    db.Places.findAll({}).then(function(Places) {
      res.json(Places);
    });
  });

  app.get("/api/food", function(req, res) {
    db.Places.findAll({
      where: {
        category: "Food"
      }
    }).then(function(Places) {
      res.json(Places);
    });
  });

  app.get("/api/drinks", function(req, res) {
    db.Places.findAll({
      where: {
        category: "Drinks"
      }
    }).then(function(Places) {
      res.json(Places);
    });
  });

  // Create a new example
  app.post("/api/new", function(req, res) {
    console.log("New place:");
    console.log(req.body);
// send to yelp api
    searchRequest.term = req.body.name;
    searchRequest.latitude = req.body.lat;
    searchRequest.longitude = req.body.lng; 
    client.search(searchRequest).then(response => {
      image = response.jsonBody.businesses[0].image_url;
      console.log("image url: " + image);
     
      db.Places.create({
        name: req.body.name,
        lat: req.body.lat,
        lng: req.body.lng,
        photo: image,
        recommendation: req.body.recommendation,
        category: req.body.category
      })
  })
      .then(function() {
      res.end();
    });
  });

};

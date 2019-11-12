var db = require("../models");

// adding default place for testing
// db.Places.create({
//     name: "FOB Poke",
//     lat: 47.613767,
//     lng: -122.3459567
//   });

module.exports = function(app) {
  // Get all examples
  app.get("/api/places", function(req, res) {
    db.Places.findAll({}).then(function(Places) {
      res.json(Places);
    });
  });

  // Create a new example
  app.post("/api/new", function(req, res) {
    console.log("New place:");
    console.log(req.body);
    db.Places.create({
      name: req.body.name,
      lat: req.body.lat,
      lng: req.body.lng,
      photo: req.body.photo,
      recommendation: req.body.recommendation,
      category: req.body.category
    })
      
      .then(function(Places) {
      res.end();
    });
  });

  app.get("/api/places/:category", function(req, res){
    db.Places.findAll({
      where: {
        category: req.params.category
      }
    }).then(function(dbPlaces) {
      res.json(dbPlaces);
    });
  });


};

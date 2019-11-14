
require("dotenv").config();
var express = require("express");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// once done testing, change this to false
var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  
  // adds default data. erase out once done testing. 
  db.Places.create({
    name: "FOB Poke",
    lat: 47.613767,
    lng: -122.3459567,
    recommendation: "Make sure to add the mango salsa!",
    photo: "https://lh5.googleusercontent.com/p/AF1QipOavwc-5eHngYoSwJ_X9B5H0cvTZMscT7V2e0hy=w408-h272-k-no",
    category: "Food"
  });
  db.Places.create({
    name: "The Whiskey Bar",
    lat: 47.6150187,
    lng: -122.338857,
    recommendation: "Get the Whiskey",
    photo: "https://lh5.googleusercontent.com/p/AF1QipOiSWEsqvk8AGt0_kyFWlWbJAvuE5fBMU7cWFIE=w408-h544-k-no",
    category: "Drinks"
  });
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;




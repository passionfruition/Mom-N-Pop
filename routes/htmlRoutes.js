var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
      });
  
      // load admin deletion page
  app.get("/admin", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/admin.html"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    console.log("this is not a page");
    res.redirect("/");
  });
};

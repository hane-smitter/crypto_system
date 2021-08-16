// Set up routes for sending user to various HTML pages

// Setting up dependencies
var path = require('path');
const axios = require('axios');

var db = require('../models');

// setting up Routes
module.exports = function (app) {
  // index route loads index.handlebars
  app.get('/', function (req, res) {
    res.render('index');
  })
  // user route loads user.handlebars
  app.get("/dashboard/:id?", function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id // gets current user id
      }
    }).then(function (users) {
      db.Coins.findAll({}).then(function (coins) {
        res.render('dashboard', {
          userData: users, // sets user data for front end use
          coinData: coins // sets user data for front end use
        })
      })
    });
  });

  // login route loads login.handlebars
  app.get("/login", function (req, res) {
    res.render("login");
  })
  // registration route loads registration.handlebars
  app.get("/registration", function (req, res) {
    res.render("registration");
  })
  //contact page
  app.get("/contact", function (req, res) {
    res.render("contact");
  })
  //about page
  app.get("/about", function (req, res) {
    res.render("about");
  })
  // route for actual API TEST
  app.get("/apiTest", function (req, res) {
    res.sendFile(path.join(__dirname, "/../public/test/test-server.js"));
  })
};

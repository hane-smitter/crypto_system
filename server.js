/********** CRYPTOTRACKER APP **********/
// Setting up app dependencies
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const env = require('dotenv').load();

// Create Express server and set the PORT
const app = express();
const PORT = process.env.PORT || 5000;

// Requiring mdoels for syncing
var db = require('./models');

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Set up middleware: passport and express session
app.use(session({
  secret: 'somethingsecretive',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// Sets up Express to use handlebars
const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));       
app.set('view engine', 'handlebars');

// static files under public folder need express setup
app.use(express.static(__dirname + '/public'));

// Sets up ROUTES
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);
require('./routes/user-routes.js')(app);
//require('./routes/favorite-routes.js')(app);
var authRoute = require('./routes/auth.js')(app, passport);

// load passport strategies
require('./config/passport.js')(passport, db.user);
// load coinmarket API data into mysql
const coinDataAPI = require('./config/coinmarket.js');


// Listening on PORT, Syncing Sequelize models and starting Express app
db.sequelize.sync({
  force: false // true will drop database
}).then(function () {
  app.listen(PORT, function (err) {
    if (!err) {
      coinDataAPI.coinData();
      console.log("App listening on PORT " + PORT);
    } else {
      console.log(err);
    }
  });
});

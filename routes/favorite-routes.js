// Set up routes for displaying and saving data to the db

// Setting up dependencies
const CoinMarketCap = require("node-coinmarketcap");
const coinmarketcap = new CoinMarketCap();
var db = require('../models');

// Setting up routes
module.exports = function (app) {

  // GET route for getting all of the favorite data
  //db.findAll
  app.get('/api/favorites/', function (req, res) {
    var currentuser = req.session.passport.user;
    var coinarray = [];
    db.Favorites.findAll({
      where: {
        userid: currentuser
      }
    }).then(function (result) {

      /*  for (var key in result){
        item = result[key];
        console.log(item);
        var symbol = item.symbol;
        console.log(symbol);
        var retcoin = coinmarketcap.get(symbol)
        coinarray.push(retcoin); *
      }*/
      res.json(result);
    })
  });   


  // GET route for retrieving data on a specific favorite
  //db.findOne
  app.get('/api/favorite/:id', function (req, res) {
    db.Favorites.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    })
  });

  // POST/PUT route for saving a cyptocoin for user to track
  //db.create

  app.post("/api/favorites/addfavorite", function (req, res) {

    db.Favorites.create({
      userid: req.session.passport.user,
      symbol: req.body.symbol

    });


  });

  // DELETE route for deleting a cyptocoin for user to track
  //db.destroy
  app.post("/api/deletefavorite", function (req, res) {

    db.destroy({
      where: {
        id: req.body.id
      }
    });

  });
}

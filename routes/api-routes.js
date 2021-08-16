// Set up routes for displaying and saving data to the db

// Setting up dependencies
var db = require('../models');
const axios = require('axios');

// Setting up routes
module.exports = function (app) {

  // GET route for getting all of the different cryptocoin data
  //db.findAll
  app.get('/api/coins', function (req, res) {
    db.Coins.findAll({}).then(function (result) {
      res.json(result);
    });
  });


  // GET route for retrieving data on a single cyptocoin
  //db.findOne

  // GET route for retrieving data of all cyptocoins a user is tracking
  //db.findAll where:query include:userId

  app.get("/api/trackedcoins", function(req, res) {

    db.findAll({}).then(function(result) {
        return res.json(result);
      });

  });

  // POST/PUT route for saving a cyptocoin for user to track
  //db.create

  app.post("/api/newtrackedcoin", function(req, res) {

   db.create({
      id: req.body.id,
      name: req.body.name,
      symbol: req.body.symbol,
      rank: req.body.rank,
      price_usd: req.body.price_usd,
      price_btc: req.body.price_btc,
      market_cap_usd: req.body.market_cap_usd,
      available_supply: req.body.available_supply,
      total_supply: req.body.total_supply,
      max_supply: req.body.max_supply,
      percent_change_1h: req.body.percent_change_1h,
      percent_change_24h: req.body.percent_change_24h,
      percent_change_7d: req.body.percent_change_7d,
      last_updated: req.body.last_updated
    }); 

  });

  // DELETE route for deleting a cyptocoin for user to track
  //db.destroy

  app.get('/api/coins/:id', function (req, res) {
    db.Coins.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      res.json(result);
    })
  });

  app.post("/api/deletecoin", function(req, res) {

    db.destroy({
      where: {
        id: req.body.id
      }
    });

  });

  //get data from the coin market
  app.get("/api/coin-market", async function(req, res) {
    let headers = {};
    const coinApiKeyHeader = 'X-CMC_PRO_API_KEY';
    let url;
    if(process.env.COINMARKETAPIKEY) {
      url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=50';
      headers[coinApiKeyHeader] = process.env.COINMARKETAPIKEY;
    } else {
      headers[coinApiKeyHeader] = 'b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c';
      url = 'https://sandbox-api.coinmarketcap.com//v1/cryptocurrency/listings/latest?limit=50';
    }

    try {
      const { data:coinMarketRes } = await axios({
        method: 'GET',
        headers,
        url
      });

      res.send(coinMarketRes.data);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  })

};

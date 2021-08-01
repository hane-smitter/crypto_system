// coinmarket strategy for API Node interaction
var exports = module.exports = {}

exports.coinData = function () {
  // dependency - CoinMarketCap
  const CoinMarketCap = require("node-coinmarketcap");
  const coinmarketcap = new CoinMarketCap();
  const db = require('../models');
  // specifies number of coins to track
  var coinCount = 25;

  // retrieve multiple coin info from API
  coinmarketcap.multi(coins => {
    // // Prints information about top 10 cryptocurrencies
    // console.log(coins.getTop(coinCount));

    // Loop through to get object key/value for top 25 coins
    coins.getTop(coinCount).forEach(element => {
      db.Coins.create({
        name: element.id,
        symbol: element.symbol,
        rank: element.rank,
        price_usd: element.price_usd,
        total_supply: element.total_supply,
        percent_change_24h: element.percent_change_24h
      })
    });

  });
}

// upsert

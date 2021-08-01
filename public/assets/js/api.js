var coinbase = require('coinbase');
var client = new coinbase.Client({
  'apiKey': ZnQXw3PXA2jTQ1wt,
  'apiSecret': 8 buGTqBDk7dW8tNMgm9O4eVN9kDYMRcT
});

client.getAccounts({}, function(err, accounts) {
  accounts.forEach(function(acct) {
    console.log('my bal: ' + acct.balance.amount + ' for ' + acct.name);
  });
});

var args = {
  "to": "user1@example.com",
  "amount": "1.234",
  "currency": "BTC",
  "description": "Sample transaction for you"
};
account.requestMoney(args, function(err, txn) {
  console.log('my txn id is: ' + txn.id);
});
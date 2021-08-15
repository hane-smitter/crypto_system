//********** DO NOT CHANGE TEXT BELOW ********** //

'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];

const {
  DB_USERNAME,
  DB_PASS,
  DB_HOST,
  DB_DEVELOPMENT,
  DB_TEST,
  DB_PRODUCTION
} = process.env;

if(DB_USERNAME) {
  config.username = DB_USERNAME;
}
if(DB_PASS) {
  config.password = DB_PASS;
}
if(DB_HOST) {
  config.host = DB_HOST;
}
let db_in_use;
switch (env.toLowerCase()) {
  case 'development':
    db_in_use = DB_DEVELOPMENT;
    break;

    case 'test':
    db_in_use = DB_TEST;
    break;

    case 'production':
    db_in_use = DB_PRODUCTION;
    break;

  default:
    db_in_use = undefined;
    break;
}
if(db_in_use) {
  config.database = db_in_use;
}

config.operatorsAliases  = false;

var db = {};

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// Set up database using Sequelize to take in data fields

module.exports = function (sequelize, DataTypes) {
  const Favorites = sequelize.define('Favorites', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
        type: DataTypes.INTEGER
      },
    symbol: {
      type: DataTypes.STRING
    }
  });

  return Favorites;
}

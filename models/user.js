// Set up database using Sequelize to take in user info

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    lastname: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    fav1: {
      type: DataTypes.STRING
    },
    fav2: {
      type: DataTypes.STRING
    },
    fav3: {
      type: DataTypes.STRING
    }
  });

  // Associating Users with Coins
  User.associate = function (models) {
    User.hasMany(models.Coins);
  }

  return User;

  document.getElementById("userName").innerHTML += User["id"];

}

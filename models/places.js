module.exports = function(sequelize, DataTypes) {
  var Places = sequelize.define("Places", {
    name: DataTypes.STRING,
    lat: DataTypes.DOUBLE,
    lng: DataTypes.DOUBLE,
    recommendation: DataTypes.STRING,
    photo: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    freezeTableName: true

  });
  return Places;
};

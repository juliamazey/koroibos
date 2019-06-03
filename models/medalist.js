'use strict';
module.exports = (sequelize, DataTypes) => {
  const Medalist = sequelize.define('Medalist', {
    EventId: DataTypes.INTEGER,
    OlympianId: DataTypes.INTEGER
  }, {});
  Medalist.associate = function(models) {
    Medalist.belongsTo(models.Olympian)
    Medalist.belongsTo(models.Event)
  };
  return Medalist;
};

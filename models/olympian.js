'use strict';
module.exports = (sequelize, DataTypes) => {
  const Olympian = sequelize.define('Olympian', {
    name: DataTypes.STRING,
    team: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sport: DataTypes.STRING,
    sex: DataTypes.STRING,
    medal: DataTypes.STRING
  }, {});
  Olympian.associate = function(models) {
    Olympian.hasMany(models.Medalist, { onDelete: 'cascade' });
    Olympian.belongsToMany(models.Event, {through: models.Medalist})
  };
  return Olympian;
};

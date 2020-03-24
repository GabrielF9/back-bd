'use strict';
module.exports = (sequelize, DataTypes) => {
  const Galaxia = sequelize.define('Galaxia', {
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    qt_sistema: DataTypes.INTEGER,
    dist_terra: DataTypes.FLOAT
  }, {});
  Galaxia.associate = function (models) {
    Galaxia.belongsTo(models.User);
    Galaxia.hasMany(models.SisPlanetario, {
      foreignKey: 'galaxia',
      as: 'sis_plans',
    });
  };
  return Galaxia;
};
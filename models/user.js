'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Galaxia, {
      foreignKey: 'user_id',
      as: 'galaxias',
    });
    User.hasMany(models.SisPlanetario, {
      foreignKey: 'user_id',
      as: 'sis_plans',
    });
    User.hasMany(models.Planeta, {
      foreignKey: 'user_id',
      as: 'planetas',
    });
    User.hasMany(models.Estrela, {
      foreignKey: 'user_id',
      as: 'estrelas',
    });
    User.hasMany(models.SatNatural, {
      foreignKey: 'user_id',
      as: 'sat_nats',
    });
  };
  return User;
};
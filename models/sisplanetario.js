'use strict';
module.exports = (sequelize, DataTypes) => {
  const SisPlanetario = sequelize.define('SisPlanetario', {
    user_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    qtd_planetas: DataTypes.INTEGER,
    qtd_estrelas: DataTypes.INTEGER,
    idade: DataTypes.INTEGER,
    galaxia: DataTypes.INTEGER
  }, {});
  SisPlanetario.associate = function (models) {
    SisPlanetario.belongsTo(models.User);
    SisPlanetario.belongsTo(models.Galaxia);
    SisPlanetario.hasMany(models.Planeta, {
      foreignKey: 'sis_plan',
      as: 'planetas',
    });
    SisPlanetario.hasMany(models.Estrela, {
      foreignKey: 'sis_plan',
      as: 'estrelas',
    });
  };
  return SisPlanetario;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estrela = sequelize.define('Estrela', {
    user_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    tamanho: DataTypes.FLOAT,
    idade: DataTypes.INTEGER,
    possui_sn: DataTypes.BOOLEAN,
    dist_terra: DataTypes.FLOAT,
    sis_plan: DataTypes.INTEGER,
    gig_verm: DataTypes.BOOLEAN,
    buraco_negro: DataTypes.BOOLEAN
  }, {});
  Estrela.associate = function (models) {
    Estrela.belongsTo(models.User);
    Estrela.belongsTo(models.SisPlanetario);
    Estrela.belongsToMany(models.Planeta, {
      through: 'PlanetaEstrela',
      foreignKey: 'id',
      as: 'planetas',
    });
  };
  return Estrela;
};
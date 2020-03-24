'use strict';
module.exports = (sequelize, DataTypes) => {
  const Planeta = sequelize.define('Planeta', {
    user_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    tamanho: DataTypes.FLOAT,
    peso: DataTypes.FLOAT,
    vel_rotacao: DataTypes.FLOAT,
    possui_sn: DataTypes.BOOLEAN,
    componentes: DataTypes.ARRAY(DataTypes.STRING),
    sis_plan: DataTypes.INTEGER
  }, {});
  Planeta.associate = function (models) {
    Planeta.belongsTo(models.User);
    Planeta.belongsTo(models.SisPlanetario);
    Planeta.hasMany(models.SatNatural, {
      foreignKey: 'planeta',
      as: 'sat_nats',
    });
    Planeta.belongsToMany(models.Estrela, {
      through: 'PlanetaEstrela',
      foreignKey: 'id',
      as: 'estrelas',
    });
  };
  return Planeta;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const SatNatural = sequelize.define('SatNatural', {
    user_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    tamanho: DataTypes.FLOAT,
    peso: DataTypes.FLOAT,
    componentes: DataTypes.ARRAY(DataTypes.STRING),
    planeta: DataTypes.INTEGER
  }, {});
  SatNatural.associate = function (models) {
    SatNatural.belongsTo(models.User);
    SatNatural.belongsTo(models.Planeta);
  };
  return SatNatural;
};
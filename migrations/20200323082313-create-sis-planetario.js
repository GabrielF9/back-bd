'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SisPlanetarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      qtd_planetas: {
        type: Sequelize.INTEGER
      },
      qtd_estrelas: {
        type: Sequelize.INTEGER
      },
      idade: {
        type: Sequelize.INTEGER
      },
      galaxia: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('SisPlanetarios');
  }
};
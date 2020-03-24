'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SatNaturals', {
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
      tamanho: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      componentes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      planeta: {
        type: Sequelize.INTEGER
      },
      estrela: {
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
    return queryInterface.dropTable('SatNaturals');
  }
};
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Estrelas', {
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
      idade: {
        type: Sequelize.INTEGER
      },
      possui_sn: {
        type: Sequelize.BOOLEAN
      },
      dist_terra: {
        type: Sequelize.FLOAT
      },
      sis_plan: {
        type: Sequelize.INTEGER
      },
      gig_verm: {
        type: Sequelize.BOOLEAN
      },
      buraco_negro: {
        type: Sequelize.BOOLEAN
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
    return queryInterface.dropTable('Estrelas');
  }
};
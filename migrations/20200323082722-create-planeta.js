'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Planeta', {
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
      vel_rotacao: {
        type: Sequelize.FLOAT
      },
      possui_sn: {
        type: Sequelize.BOOLEAN
      },
      componentes: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      sis_plan: {
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
    return queryInterface.dropTable('Planeta');
  }
};
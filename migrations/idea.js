'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ideas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idea: {
        type: Sequelize.STRING
      },
      criticalEvent: {
        type: Sequelize.STRING
      },
      challenge: {
        type: Sequelize.STRING
      },
      attention: {
        type: Sequelize.STRING
      },
      responsiblity: {
        type: Sequelize.STRING
      },
      orgId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      nearFutureCompetitors: {
        type: Sequelize.STRING
      },
      farFutureCompetitors: {
        type: Sequelize.STRING
      },
      positions: {
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ideas');
  }
};
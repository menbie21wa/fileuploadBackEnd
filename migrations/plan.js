'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roadMap: {
        type: Sequelize.STRING
      },
      potential: {
        type: Sequelize.STRING
      },
      budgetSource: {
        type: Sequelize.STRING
      },
      alternativeDirection: {
        type: Sequelize.STRING
      },
      communicationNetwork: {
        type: Sequelize.STRING
      },
      success: {
        type: Sequelize.STRING
      },
      marketing: {
        type: Sequelize.STRING
      },
      actionResult: {
        type: Sequelize.STRING
      },
      resultShare: {
        type: Sequelize.STRING
      },
      competitionCoopration: {
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
    await queryInterface.dropTable('Plans');
  }
};
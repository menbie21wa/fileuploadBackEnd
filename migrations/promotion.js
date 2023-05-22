'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Promotions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      commonGoal: {
        type: Sequelize.STRING
      },
      feasibilityStudy: {
        type: Sequelize.STRING
      },
      agreement: {
        type: Sequelize.STRING
      },
      promoting: {
        type: Sequelize.STRING
      },
      agreementFollowUp: {
        type: Sequelize.STRING
      },
      recognitionAward: {
        type: Sequelize.STRING
      },
      demand: {
        type: Sequelize.STRING
      },
      developCommonGoal: {
        type: Sequelize.STRING
      },
      developedFeasibility: {
        type: Sequelize.STRING
      },
      renewContract: {
        type: Sequelize.STRING
      },
      orgId: {
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Promotions');
  }
};
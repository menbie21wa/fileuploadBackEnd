'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      licencedProject: {
        type: Sequelize.STRING,
      },
      dayMonthPlan: {
        type: Sequelize.STRING,
      },
      salaryFile: {
        type: Sequelize.STRING,
      },
      monthlyReport: {
        type: Sequelize.STRING,
      },
      advertisingRegulation: {
        type: Sequelize.STRING,
      },
      accountingHrRegulation: {
        type: Sequelize.STRING,
      },
      letterRule: {
        type: Sequelize.STRING,
      },
      contractRule: {
        type: Sequelize.STRING,
      },
      orgId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Organizations', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        //onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  },
};

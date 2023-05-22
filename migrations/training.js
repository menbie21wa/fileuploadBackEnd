'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trainings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      create: {
        type: Sequelize.STRING
      },
      process: {
        type: Sequelize.STRING
      },
      store: {
        type: Sequelize.STRING
      },
      timeUtilization: {
        type: Sequelize.STRING
      },
      competitionCooperation: {
        type: Sequelize.STRING
      },
      alternative: {
        type: Sequelize.STRING
      },
      communicationWay: {
        type: Sequelize.STRING
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
      beforeAfter3500: {
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
    await queryInterface.dropTable('Trainings');
  }
};
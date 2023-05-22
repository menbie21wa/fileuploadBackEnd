'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobSkills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      jobSalary: {
        type: Sequelize.DECIMAL,
      },
      skill: {
        type: Sequelize.STRING,
      },
      nature: {
        type: Sequelize.STRING,
      },
      need: {
        type: Sequelize.STRING,
      },
      prospherity: {
        type: Sequelize.STRING,
      },
      commonNeed: {
        type: Sequelize.STRING,
      },
      schedule: {
        type: Sequelize.STRING,
      },
      acting: {
        type: Sequelize.STRING,
      },
      studyDesign: {
        type: Sequelize.STRING,
      },
      innovation: {
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
    await queryInterface.dropTable('JobSkills');
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Legalities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ruleRegulation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      businessName: {
        type: Sequelize.STRING,
      },
      agreement: {
        type: Sequelize.STRING,
      },
      registrationLicense: {
        type: Sequelize.STRING,
      },
      businessLicense: {
        type: Sequelize.STRING,
      },
      taxPayerID: {
        type: Sequelize.STRING,
      },
      legalReceipts: {
        type: Sequelize.STRING,
      },
      accountCheck: {
        type: Sequelize.STRING,
      },
      professionalLicense: {
        type: Sequelize.STRING,
      },
      acceptedProject: {
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
    await queryInterface.dropTable('Legalities');
  },
};

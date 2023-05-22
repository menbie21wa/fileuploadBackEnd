'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projectoffices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      organizedOffice: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      licensedProject: {
        type: Sequelize.TEXT,
      },
      planForm: {
        type: Sequelize.STRING,
      },
      payrollForm: {
        type: Sequelize.STRING,
      },
      paymentOrderForm: {
        type: Sequelize.STRING,
      },
      monthlyReportExpert: {
        type: Sequelize.STRING,
      },
      promotionExpert: {
        type: Sequelize.STRING,
      },
      accountant: {
        type: Sequelize.STRING,
      },
      typist: {
        type: Sequelize.STRING,
      },
      contractForm: {
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
    await queryInterface.dropTable('Projectoffices');
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Organizations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      tinNumber: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      streetNumber: {
        type: Sequelize.STRING,
      },
      digitalID: {
        type: Sequelize.STRING,
      },
      businessSector: {
        type: Sequelize.STRING,
      },
      bank: {
        type: Sequelize.STRING,
      },
      numberOfStocks: {
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      establishment: {
        type: Sequelize.STRING,
      },
      capital: {
        type: Sequelize.DECIMAL,
      },
      employees: {
        type: Sequelize.INTEGER,
      },
      currentCapital: {
        type: Sequelize.DECIMAL,
      },
      stockFounder: {
        type: Sequelize.INTEGER,
      },
      currentStock: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Organizations');
  },
};

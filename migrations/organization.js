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
      orgCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
        type: Sequelize.ENUM('sc', 'plc', 'partners'),

        allowNull: false,
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
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
      },
      establishment: {
        type: Sequelize.TEXT,
      },
      capital: {
        type: Sequelize.DECIMAL,
      },
      country: {
        type: Sequelize.STRING,
      },
      region: {
        type: Sequelize.STRING,
      },
      zone: {
        type: Sequelize.STRING,
      },
      woreda: {
        type: Sequelize.STRING,
      },
      kebele: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      subCity: {
        type: Sequelize.STRING,
      },
      houseNummber: {
        type: Sequelize.STRING,
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

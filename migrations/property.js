'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      workshop: {
        type: Sequelize.STRING,
      },
      fieldMaterial: {
        type: Sequelize.STRING,
      },
      cashMoney: {
        type: Sequelize.DECIMAL,
        allowNull: true,
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
      budget: {
        type: Sequelize.DECIMAL,
      },
      fullTimeWorkers: {
        type: Sequelize.INTEGER,
      },
      contratWorkers: {
        type: Sequelize.INTEGER,
      },
      design: {
        type: Sequelize.STRING,
      },
      cityDevelopment: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Properties');
  },
};

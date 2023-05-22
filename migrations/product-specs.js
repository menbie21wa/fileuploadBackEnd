'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product_specs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      thickness: {
        type: Sequelize.STRING
      },
      engine: {
        type: Sequelize.STRING
      },
      process_time: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      version: {
        type: Sequelize.STRING
      },
      ram: {
        type: Sequelize.INTEGER
      },
      generation: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      productId: {
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
    await queryInterface.dropTable('Product_specs')
  }
};

  },
};


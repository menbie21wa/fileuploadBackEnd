'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      size: {
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
        type: Sequelize.STRING
      },
      generation: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      quality: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      catId: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'User',
        //   key: 'userId'
        // }
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
    await queryInterface.dropTable('Products');
  }
};
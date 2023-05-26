'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      belief: { type: Sequelize.TEXT },
      hope: { type: Sequelize.TEXT },
      love: { type: Sequelize.TEXT },
      cost: { type: Sequelize.TEXT },
      consumption: { type: Sequelize.TEXT },
      vision: { type: Sequelize.TEXT },
      mainObjective: { type: Sequelize.TEXT },
      specificObjective: { type: Sequelize.TEXT },
      goal: { type: Sequelize.TEXT },
      mission: { type: Sequelize.TEXT },
      value: { type: Sequelize.TEXT },
      principle: { type: Sequelize.TEXT },
      voice: { type: Sequelize.TEXT },
      motto: { type: Sequelize.TEXT },
      userId: { type: Sequelize.INTEGER },
      orgId: { type: Sequelize.INTEGER },

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
    await queryInterface.dropTable('Categories');
  },
};

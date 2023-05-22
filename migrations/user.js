'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      title: {
        type: Sequelize.STRING,
      },

      firstName: {
        type: Sequelize.STRING,
      },
      middleName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.ENUM('super_admin', 'admin', 'user', 'customer'),
        defaultValue: 'user',
        allowNull: false,
      },
      userCode: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      accountBalance: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },

      // vacancyID: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "Vacancies",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      // letterID: {
      //   type: Sequelize.INTEGER,
      //   allowNull: true,
      //   references: {
      //     model: "Letters",
      //     key: "id",
      //   },
      //   onDelete: "CASCADE",
      // },
      gender: {
        type: Sequelize.STRING,
      },
      website: {
        type: Sequelize.STRING,
      },
      dateOfBirth: {
        type: Sequelize.STRING,
      },
      country: {
        type: Sequelize.STRING,
      },
      city: {
        type: Sequelize.STRING,
      },
      streetNumber: {
        type: Sequelize.STRING,
      },
      profilePic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      file: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      education: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      position: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      woreda: {
        type: Sequelize.STRING,
      },
      profession: {
        type: Sequelize.STRING,
      },
      kebele: {
        type: Sequelize.STRING,
      },
      maritalStatus: {
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
    await queryInterface.dropTable('Users');
  },
};

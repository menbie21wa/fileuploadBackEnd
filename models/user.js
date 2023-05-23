'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      middleName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      sex: DataTypes.STRING,
      userCode: DataTypes.INTEGER,
      role: DataTypes.ENUM('super_admin', 'admin', 'user', 'customer'),
      dateOfBirth: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      kebele: DataTypes.STRING,
      subCity: DataTypes.STRING,
      city: DataTypes.STRING,
      region: DataTypes.STRING,
      country: DataTypes.STRING,
      continent: DataTypes.STRING,
      religion: DataTypes.STRING,
      position: DataTypes.STRING,
      education: DataTypes.STRING,
      profession: DataTypes.STRING,
      avatar: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      bank: DataTypes.STRING,
      bankAccountNumber: DataTypes.STRING,
      workExperience: DataTypes.STRING,
      achievement: DataTypes.STRING,
      skill: DataTypes.STRING,
      hobbies: DataTypes.STRING,
      weight: DataTypes.STRING,
      hight: DataTypes.STRING,
      language: DataTypes.STRING,
      bloodType: DataTypes.STRING,
      eyeColor: DataTypes.STRING,
      motherName: DataTypes.STRING,
      motherlastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  User.associate = function (models) {
    User.hasMany(models.Tef_Wof, {
      foreignKey: 'userId',

      //onDelete: 'CASCADE'
    });
    User.hasMany(models.Hasab, {
      foreignKey: 'userId',

      //onDelete: 'CASCADE'
    });
    User.hasMany(models.Product, {
      foreignKey: 'userId',

      //onDelete: 'CASCADE'
    });
  };
  return User;
};

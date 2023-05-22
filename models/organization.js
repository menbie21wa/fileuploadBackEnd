'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Organization.init(
    {
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      tinNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      type: DataTypes.STRING,
      streetNumber: DataTypes.STRING,
      digitalID: DataTypes.STRING,
      businessSector: DataTypes.STRING,
      bank: DataTypes.STRING,
      numberOfStocks: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      logo: DataTypes.STRING,
      establishment: DataTypes.STRING,
      capital: DataTypes.DECIMAL,
      employees: DataTypes.INTEGER,
      currentCapital: DataTypes.DECIMAL,
      stockFounder: DataTypes.INTEGER,
      currentStock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Organization',
    }
  );
  return Organization;
};

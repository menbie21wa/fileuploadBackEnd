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
      orgCode: DataTypes.INTEGER,
      brand: DataTypes.STRING,
      tinNumber: DataTypes.INTEGER,
      address: DataTypes.STRING,
      type: DataTypes.ENUM('stock', 'plc', 'partnership'),
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
  Organization.associate = function (models) {
    Organization.hasMany(models.Plan, {
      foreignKey: 'orgId',

      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.JobSkill, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasMany(models.Product, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Projectoffice, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Promotion, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Legality, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Training, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Property, {
      foreignKey: 'orgId',
      onDelete: 'CASCADE',
    });
    Organization.hasMany(models.JobSkill, {
      foreignKey: 'orgId',

      //onDelete: 'CASCADE'
    });
  };

  return Organization;
};

'use strict';
const { Model, STRING } = require('sequelize');
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
      type: DataTypes.ENUM('sc', 'plc', 'partners'),
      streetNumber: DataTypes.STRING,
      digitalID: DataTypes.STRING,
      businessSector: DataTypes.STRING,
      bank: DataTypes.STRING,
      numberOfStocks: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      email: DataTypes.STRING,
      logo: DataTypes.STRING,
      establishment: DataTypes.TEXT,
      capital: DataTypes.DECIMAL,
      employees: DataTypes.INTEGER,
      currentCapital: DataTypes.DECIMAL,
      stockFounder: DataTypes.INTEGER,
      currentStock: DataTypes.INTEGER,
      country: DataTypes.STRING,
      region: DataTypes.STRING,
      zone: DataTypes.STRING,
      woreda: DataTypes.STRING,
      kebele: DataTypes.STRING,
      city: DataTypes.STRING,
      subCity: DataTypes.STRING,
      houseNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Organization',
    }
  );
  Organization.associate = function (models) {
    Organization.hasOne(models.Plan, {
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
    Organization.hasOne(models.Tef_Wof, {
      foreignKey: 'orgId',

      onDelete: 'CASCADE',
    });
    Organization.hasOne(models.Hasab, {
      foreignKey: 'orgId',

      onDelete: 'CASCADE',
    });
  };

  return Organization;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Property.init(
    {
      workshop: DataTypes.STRING,
      fieldMaterial: DataTypes.STRING,
      cashMoney: DataTypes.DECIMAL,
      budget: DataTypes.DECIMAL,
      fullTimeWorkers: DataTypes.INTEGER,
      contratWorkers: DataTypes.INTEGER,
      design: DataTypes.STRING, //file
      cityDevelopment: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Property',
    }
  );

  Property.associate = function (models) {
    Property.belongsTo(models.Organization, {
      foreignKey: 'orgId',
      //onDelete: 'CASCADE',
    });

    // associations can be defined here
  };
  return Property;
};

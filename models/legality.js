'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Legality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Legality.init(
    {
      ruleRegulation: DataTypes.STRING,
      businessName: DataTypes.STRING,
      agreement: DataTypes.STRING,
      registrationLicense: DataTypes.STRING,
      businessLicense: DataTypes.STRING,
      taxPayerID: DataTypes.STRING,
      legalReceipts: DataTypes.STRING,
      accountCheck: DataTypes.STRING,
      professionalLicense: DataTypes.STRING,
      acceptedProject: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Legality',
    }
  );
  return Legality;
};

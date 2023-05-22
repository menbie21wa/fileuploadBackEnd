'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promotion.init(
    {
      commonGoal: DataTypes.STRING,
      feasibilityStudy: DataTypes.STRING,
      agreement: DataTypes.STRING,
      promoting: DataTypes.STRING,
      agreementFollowUp: DataTypes.STRING,
      recognitionAward: DataTypes.STRING,
      demand: DataTypes.STRING,
      developCommonGoal: DataTypes.STRING,
      developedFeasibility: DataTypes.STRING,
      renewContract: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Promotion',
    }
  );
  return Promotion;
};

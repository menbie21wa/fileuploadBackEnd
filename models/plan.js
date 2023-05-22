'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Plan.init(
    {
      roadMap: DataTypes.STRING,
      potential: DataTypes.STRING,
      budgetSource: DataTypes.STRING,
      alternativeDirection: DataTypes.STRING,
      communicationNetwork: DataTypes.STRING,
      success: DataTypes.STRING,
      marketing: DataTypes.STRING,
      actionResult: DataTypes.STRING,
      resultShare: DataTypes.STRING,
      competitionCoopration: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Plan',
    }
  );

  Plan.associate = function (models) {
    Plan.belongsTo(models.Organization, {
      foreignKey: 'orgId',
      //onDelete: 'CASCADE',
    });

    // associations can be defined here
  };
  return Plan;
};

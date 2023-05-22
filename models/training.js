'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Training extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Training.init(
    {
      create: DataTypes.STRING,
      process: DataTypes.STRING,
      store: DataTypes.STRING,
      timeUtilization: DataTypes.STRING,
      competitionCooperation: DataTypes.STRING,
      alternative: DataTypes.STRING,
      communicationWay: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
      beforeAfter3500: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Training',
    }
  );
  return Training;
};

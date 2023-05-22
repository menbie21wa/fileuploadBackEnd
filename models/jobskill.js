'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSkill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobSkill.init(
    {
      jobSalary: DataTypes.DECIMAL,
      skill: DataTypes.STRING,
      nature: DataTypes.STRING,
      need: DataTypes.STRING,
      prospherity: DataTypes.STRING,
      commonNeed: DataTypes.STRING,
      schedule: DataTypes.STRING,
      acting: DataTypes.STRING,
      studyDesign: DataTypes.STRING,
      innovation: DataTypes.STRING,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'JobSkill',
    }
  );
  return JobSkill;
};

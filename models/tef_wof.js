'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tef_Wof extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Tef_Wof.init(
    {
      belief: DataTypes.TEXT,
      hope: DataTypes.TEXT,
      love: DataTypes.TEXT,
      cost: DataTypes.TEXT,
      consumption: DataTypes.TEXT,
      value: DataTypes.TEXT,
      principle: DataTypes.TEXT,
      vision: DataTypes.TEXT,
      mission: DataTypes.TEXT,
      mainObjective:DataTypes.TEXT,
      specificObjective:DataTypes.TEXT,
      goal: DataTypes.TEXT,
      voice: DataTypes.TEXT,
      motto: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Tef_Wof',
    }
  );

  Tef_Wof.associate = function (models) {
    Tef_Wof.belongsTo(models.User, {
      foreignKey: 'userId',
      //onDelete: 'CASCADE'
    });

    // associations can be defined here
  };
  return Tef_Wof;
};

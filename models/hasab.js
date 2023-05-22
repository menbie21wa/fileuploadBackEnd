'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hasab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Hasab.init(
    {
      idea: DataTypes.STRING,
      criticalEvent: DataTypes.STRING,
      challenge: DataTypes.STRING,
      smallCompitative: DataTypes.STRING,
      largeCompitative: DataTypes.STRING,
      attention: DataTypes.STRING,
      responsibility: DataTypes.STRING,
      earlyPosition: DataTypes.STRING,
      relatedScene: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      orgId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Hasab',
    }
  );
  Hasab.associate = function (models) {
    Hasab.belongsTo(models.User, {
      foreignKey: 'userId',
      //onDelete: 'CASCADE'
    });

    // associations can be defined here
  };
  return Hasab;
};

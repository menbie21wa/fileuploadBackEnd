'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_specification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  product_specification.init(
    {
      model: DataTypes.STRING,
      size: DataTypes.STRING,
      color: DataTypes.STRING,
      thickness: DataTypes.STRING,
      engine: DataTypes.STRING,
      process_time: DataTypes.STRING,
      weight: DataTypes.STRING,
      version: DataTypes.STRING,
      ram: DataTypes.INTEGER,
      generation: DataTypes.STRING,
      material: DataTypes.STRING,
      catId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'product_specification',
    }
  );
  return product_specification;
};

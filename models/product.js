'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      brand: DataTypes.STRING,
      category: DataTypes.STRING,
      quality: DataTypes.STRING,
      price: DataTypes.STRING,
      images: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );
  return product;
};

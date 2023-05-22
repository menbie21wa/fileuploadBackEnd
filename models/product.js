'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    brand: DataTypes.STRING,
    category: DataTypes.STRING,
    quality: DataTypes.STRING,
    price: DataTypes.STRING,
    images: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.associate = function(models) {
    Product.hasMany(models.product_specs, {
      foreignKey: 'productId',
     
      //onDelete: 'CASCADE'
    })
  };
  return Product;
};

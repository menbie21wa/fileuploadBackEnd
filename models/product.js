'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    size: DataTypes.STRING,
    thickness: DataTypes.STRING,
    engine: DataTypes.STRING,
    process_time: DataTypes.STRING,
    weight: DataTypes.STRING,
    version: DataTypes.STRING,
    ram: DataTypes.STRING,
    generation: DataTypes.STRING,
    material: DataTypes.STRING,
    quality: DataTypes.STRING,
    price: DataTypes.STRING,
    avatar: DataTypes.STRING,
    audio: DataTypes.STRING,
    video: DataTypes.STRING,
    description: DataTypes.STRING,
    catId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    orgId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });


  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'catId',
      
    })
    Product.belongsTo(models.User, {
      foreignKey: 'userId',
     
      
    })
    Product.belongsTo(models.Organization, {
      foreignKey: 'orgId',
     
      
    })
  };
  return Product;
};
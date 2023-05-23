'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_specs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Product_specs.init(
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
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product_specs',
    }
  );
  Product_specs.associate = function (models) {
    Product_specs.belongsTo(models.Product, {
      foreignKey: 'productId',

      //onDelete: 'CASCADE'
    });
  };

  // Product.associate = function(models) {
  //   Product.hasMany(models.Product_specs, {
  //     foreignKey: 'productId',
     
      
  //   });

  //   Product.belongsTo(models.User, {
  //     foreignKey: 'userId',
     
      
  //   })
  //   Product.belongsTo(models.Organization, {
  //     foreignKey: 'orgId',
     
      
  //   })
  // };
  return Product_specs;
};

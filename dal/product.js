const Model = require("../models");
const Product = Model.product;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = async (productData, cb) => {
  
    try {
  
      let product = await Product.create(productData);
      return cb(null, product?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.get = async (query, cb) => {
    console.log("query",query);
    
    try {
  
      let product = await Product.findOne(query);
      //console.log("tef wof",tef_wof)
      return cb(null, product?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getCollection = async (query, cb) => {
   
    
    try {
      
      let product = await Product.findAll(query);
     
      console.log("product",product);

      return cb(null, product);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getByPk = async (query, cb) => {
    try {
      let product = await Product.findByPk(query);
      return cb(null, product?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.delete = async (query, cb) => {
    try {
      let product = await Product.findByPk(query);
      product.destroy();
      return cb(null, product?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.update = async (updates, query, cb) => {
    try {
      let updatedData = await Product.update(updates, query);
      return cb(null, updatedData);
    } catch (err) {
      return cb(err);
    }
  };
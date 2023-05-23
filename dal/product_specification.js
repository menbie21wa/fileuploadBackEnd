const Model = require("../models");
const Specification = Model.Product_specs;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = async (specificationData, cb) => {
  
    try {
  
      let specification = await Specification.create(specificationData);
      return cb(null, specification?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };
  exports.get = async (query, cb) => {
    console.log("query",query);
    try {
  
      let specification = await Specification.findOne(query);
      //console.log("tef wof",tef_wof)
      return cb(null, specification?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getCollection = async (query, cb) => {
    console.log("query",query)
    try {
  
      let specification = await Specification.findAll(query);
      //console.log("user",user)
      return cb(null, specification);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getByPk = async (query, cb) => {
    try {
      let specification = await Specification.findByPk(query);
      return cb(null, specification?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.delete = async (query, cb) => {
    try {
      let specification = await Specification.findByPk(query);
      specification.destroy();
      return cb(null, specification?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.update = async (updates, query, cb) => {
    try {
      let updatedData = await Specification.update(updates, query);
      return cb(null, updatedData);
    } catch (err) {
      return cb(err);
    }
  };
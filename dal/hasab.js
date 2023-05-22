const Model = require("../models");
const Hasab = Model.Hasab;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = async (hasabData, cb) => {
  
    try {
  
      let hasab = await Hasab.create(hasabData);
      return cb(null, hasab?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };
  exports.get = async (query, cb) => {
    console.log("query",query)
    
    try {
  
      let hasab = await Hasab.findOne(query);
      //console.log("tef wof",tef_wof)
      return cb(null, hasab?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getCollection = async (query, cb) => {
    console.log("query",query)
    
    try {
  
      let hasab = await Hasab.findAll(query);
      //console.log("user",user)
      return cb(null, hasab);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getByPk = async (query, cb) => {
    try {
      let hasab = await Hasab.findByPk(query);
      return cb(null, hasab?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.delete = async (query, cb) => {
    try {
      let hasab = await Hasab.findByPk(query);
      hasab.destroy();
      return cb(null, hasab?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.update = async (updates, query, cb) => {
    try {
      let updatedData = await Hasab.update(updates, query);
      return cb(null, updatedData);
    } catch (err) {
      return cb(err);
    }
  };
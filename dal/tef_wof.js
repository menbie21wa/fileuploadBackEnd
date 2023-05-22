const Model = require("../models");
const Tef_Wof = Model.Tef_Wof;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = async (tefData, cb) => {
  
    try {
  
      let tef_wof = await Tef_Wof.create(tefData);
      return cb(null, tef_wof?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };
  exports.get = async (query, cb) => {
    console.log("query",query)
    
    try {
  
      let tef_wof = await Tef_Wof.findOne(query);
      //console.log("tef wof",tef_wof)
      return cb(null, tef_wof?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getCollection = async (query, cb) => {
    console.log("query",query)
    
    try {
  
      let tef_wof = await Tef_Wof.findAll(query);
      //console.log("user",user)
      return cb(null, tef_wof);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.getByPk = async (query, cb) => {
    try {
      let tef_wof = await Tef_Wof.findByPk(query);
      return cb(null, tef_wof?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.delete = async (query, cb) => {
    try {
      let tef_wof = await Tef_Wof.findByPk(query);
      tef_wof.destroy();
      return cb(null, tef_wof?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };

  exports.update = async (updates, query, cb) => {
    try {
      let updatedData = await Tef_Wof.update(updates, query);
      return cb(null, updatedData);
    } catch (err) {
      return cb(err);
    }
  };
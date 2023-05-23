const Model = require("../models");
const Category = Model.Category;
const Product= Model.Product;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

exports.create = async (categoryData, cb) => {
  
    try {
  
      let category = await Category.create(categoryData);
      return cb(null, category?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.get = async (query, cb) => {
    console.log("query",query);
    try {
  
      let category = await Category.findOne(query);
      //console.log("tef wof",tef_wof)
      return cb(null, category?.dataValues);
    } catch (err) {
      return cb(err.message);
    }
  };
  exports.getCollection = async (query, cb) => {
    console.log("query",query)
    try {
  
      let category = await Category.findAll({
        include:[{
        model  :Product
        }
        ]
      });
      //console.log("user",user)
      return cb(null, category);
    } catch (err) {
      return cb(err.message);
    }
  };

  exports.search = async (query, qs, cb) => {
    try {
      let searchCondition = {
        where: {
          [Op.or]: [
            {
              name: {
                [Op.like]: `%${query}%`,
              },
            },
            {
              id: {
                [Op.like]: `%${query}%`,
              },
            },
          ],
        },
      };
  
      let category = await Category.findAll({
        searchCondition,
        include: [
          {model: Product}
        ]
      });
  
      return cb(null, category);
    } catch (err) {
      return cb(err);
    }
  };

  exports.getByPk = async (query, cb) => {
    try {
      let category = await Category.findByPk(query,{
        include: [
          {model: Product}
        ]
      });
      return cb(null, category?.dataValues);
    } catch (err) {
      return cb(err);
    }
  };
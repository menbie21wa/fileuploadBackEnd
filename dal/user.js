const Model = require('../models');
const User = Model.User;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const TefWof = Model.Tef_Wof;
const Hasab = Model.Hasab;
const Product = Model.Product;

exports.create = async (userData, cb) => {
  try {
    let user = await User.create(userData);
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};
exports.get = async (query, cb) => {
  try {
    let user = await User.findOne(query);
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let user = await User.findAll(query);
    return cb(null, user);
  } catch (err) {
    return cb(err.message);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    let user = await User.findByPk(query, {
      include: [{ model: TefWof }, { model: Hasab }, { model: Product }],
    });
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    let user = await User.findByPk(query);
    user.destroy();
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err);
  }
};
exports.search = async (query, qs, cb) => {
  try {
    let searchCondition = {
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            userCode: {
              [Op.like]: `%${query}%`,
            },
          },
          {
            phoneNumber: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    };

    let users = await User.findAll(searchCondition);

    return cb(null, users);
  } catch (err) {
    return cb(err);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await User.update(updates, query);

    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

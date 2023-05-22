
const Model = require("../models");
const User = Model.User;
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
// console.log("user dal");
const TefWof = Model.Tef_Wof
const Hasab= Model.Hasab

exports.create = async (userData, cb) => {
  
  try {

    let user = await User.create(userData);
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};
exports.get = async (query, cb) => {
  //console.log("query",query)
  
  try {

    let user = await User.findOne(query);
    //console.log("user",user)
    return cb(null, user?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.getCollection = async (query, cb) => {
  console.log("query",query)
  
  try {

    let user = await User.findAll(query)

    //console.log("user",user)
    return cb(null, user);
  } catch (err) {
    return cb(err.message);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    let user = await User.findByPk(query,{
      include: [
       {model: TefWof},
       {model: Hasab}
        
    ]
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

// exports.bulkCreate = async (userData, cb) => {
//   try {
//     let user = await User.bulkCreate(userData);
//     return cb(null, user);
//   } catch (err) {
//     return cb(err.message);
//   }
// };
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
    let updatedData = await User.update(updates, query)
    //console.log("updated", updatedData);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};


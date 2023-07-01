const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const EplusappFile = Model.EplusappFile;


exports.create = async (eplusappData, cb) => {
  try {
    const eplusapp = await EplusappFile.create(eplusappData);

    return cb(null, eplusapp?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const file = await EplusappFile.findByPk(query);

    return cb(null, file?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const file = await EplusappFile.findByPk(query);

    file.destroy();

    return cb(null, file?.dataValues);
    
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
 
  try {
    let files = await EplusappFile.findAll(query);
    return cb(null, files);
  } catch (err) {
    return cb(err);
  }
  
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await EplusappFile.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let files = await EplusappFile.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      file: files,
      page: Number(qs?.page),
      limit: Number(qs?.limit),
      pages: pages,
      total: data?.count,
    });
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
            type: {
              [Op.like]: `%${query}%`,
            },
          },
        ],
      },
    };

    let files = await EplusappFile.findAll(searchCondition);

    return cb(null, files);
  } catch (err) {
    return cb(err);
  }
};

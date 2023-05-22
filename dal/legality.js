const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Legality = Model.Legality;

exports.create = async (legalityData, cb) => {
  try {
    const payload = await Legality.create(legalityData);

    return cb(null, payload?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Legality.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const legality = await Legality.findByPk(query);

    return cb(null, legality?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const legality = await Legality.findOne(query);

    return cb(null, legality?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const legality = await Legality.findByPk(query);

    legality.destroy();

    return cb(null, legality?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let legalitys = await Legality.findAll(query);
    return cb(null, legalitys);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Legality.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let legalities = await Legality.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      legalities: legalities,
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

    let legalities = await Legality.findAll(searchCondition);

    return cb(null, legalities);
  } catch (err) {
    return cb(err);
  }
};

const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Promotions = Model.Promotion;

exports.create = async (promotionData, cb) => {
  try {
    const promotion = await Promotions.create(promotionData);

    return cb(null, promotion?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Promotions.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const promotion = await Promotions.findByPk(query);

    return cb(null, promotion?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const promotion = await Promotions.findOne(query);

    return cb(null, promotion?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const promotion = await Promotions.findByPk(query);

    promotion.destroy();

    return cb(null, promotion?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let promotions = await Promotions.findAll(query);
    return cb(null, promotions);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Promotions.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let promotions = await Promotions.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      promotions: promotions,
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

    let promotions = await Promotion.findAll(searchCondition);

    return cb(null, promotions);
  } catch (err) {
    return cb(err);
  }
};

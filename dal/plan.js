const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const Plan = Model.Plan;

exports.create = async (planData, cb) => {
  try {
    const plan = await Plan.create(planData);

    return cb(null, plan?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Plan.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const plan = await Plan.findByPk(query);

    return cb(null, plan?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const plan = await Plan.findOne(query);

    return cb(null, plan?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const plan = await Plan.findByPk(query);

    plan.destroy();

    return cb(null, plan?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let plans = await Plan.findAll(query);
    return cb(null, plans);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Plan.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let plans = await Plan.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      plans: plans,
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

    let plans = await Plan.findAll(searchCondition);

    return cb(null, plans);
  } catch (err) {
    return cb(err);
  }
};

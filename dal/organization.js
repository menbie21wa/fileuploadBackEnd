const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Organization = Model.Organization;
const Legality = Model.Legality;
const Property = Model.Property;
const Training = Model.Training;
const JobSkill = Model.JobSkill;
const Plan = Model.Plan;
const Promotion = Model.Promotion;
const Product = Model.Product;
const Projectoffice = Model.Projectoffice;
const Hasab = Model.Hasab;
const Tef_wof = Model.Tef_Wof;

exports.create = async (organizationData, cb) => {
  try {
    const organization = await Organization.create(organizationData);

    return cb(null, organization?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Organization.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const org = await Organization.findByPk(query, {
      include: [
        { model: Legality },
        { model: Product },
        { model: Plan },
        { model: Property },
        { model: Training },
        { model: Hasab },
        { model: Projectoffice },
        { model: Promotion },
        { model: JobSkill },
        { model: Tef_wof },
      ],
    });

    return cb(null, org?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const org = await Organization.findOne(query);

    return cb(null, org?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const org = await Organization.findByPk(query);

    org.destroy();

    return cb(null, org?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  console.log('orgQuery', query);
  try {
    let orgs = await Organization.findAll(query);
    return cb(null, orgs);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Organization.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let orgs = await Organization.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      organizations: orgs,
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

    let organizations = await Organization.findAll(searchCondition);

    return cb(null, organizations);
  } catch (err) {
    return cb(err);
  }
};

const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Property = Model.Property;

exports.create = async (propertyData, cb) => {
  try {
    const property = await Property.create(propertyData);

    return cb(null, property?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Property.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const property = await Property.findByPk(query);

    return cb(null, property?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const peroperty = await Property.findOne(query);

    return cb(null, peroperty?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const property = await Property.findByPk(query);

    property.destroy();

    return cb(null, property?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let properties = await Property.findAll(query);
    return cb(null, properties);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Property.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let properties = await Property.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      properties: properties,
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

    let peroperties = await Property.findAll(searchCondition);

    return cb(null, peroperties);
  } catch (err) {
    return cb(err);
  }
};

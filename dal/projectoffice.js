const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const Project = Model.Projectoffice;

exports.create = async (projectData, cb) => {
  try {
    const project = await Project.create(projectData);

    return cb(null, project?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await Project.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const project = await Project.findByPk(query);

    return cb(null, project?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const project = await Project.findOne(query);

    return cb(null, project?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const project = await Project.findByPk(query);

    project.destroy();

    return cb(null, project?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let projects = await Project.findAll(query);
    return cb(null, projects);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await Project.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let projects = await Project.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      projects: projects,
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

    let projects = await Project.findAll(searchCondition);

    return cb(null, projects);
  } catch (err) {
    return cb(err);
  }
};

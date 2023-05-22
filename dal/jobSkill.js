const Model = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const JobSkill = Model.JobSkill;

exports.create = async (jobSkillData, cb) => {
  try {
    const job_skill = await JobSkill.create(jobSkillData);

    return cb(null, job_skill?.dataValues);
  } catch (err) {
    return cb(err.message);
  }
};

exports.update = async (updates, query, cb) => {
  try {
    let updatedData = await JobSkill.update(updates, query);
    return cb(null, updatedData);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPk = async (query, cb) => {
  try {
    const skill = await JobSkill.findByPk(query);

    return cb(null, skill?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.get = async (query, cb) => {
  try {
    const job_skill = await JobSkill.findOne(query);

    return cb(null, job_skill?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.delete = async (query, cb) => {
  try {
    const job_skill = await JobSkill.findByPk(query);

    job_skill.destroy();

    return cb(null, job_skill?.dataValues);
  } catch (err) {
    return cb(err);
  }
};

exports.getCollection = async (query, cb) => {
  try {
    let job_skills = await JobSkill.findAll(query);
    return cb(null, job_skills);
  } catch (err) {
    return cb(err);
  }
};

exports.getByPagination = async (query, qs, cb) => {
  let limit = Number(qs?.limit); // number of records per page

  try {
    let data = await JobSkill.findAndCountAll();
    let page = qs?.page; // page number
    let pages = Number(Math.ceil(data.count / limit));
    let offset = limit * (page - 1) || 0;
    let job_skills = await JobSkill.findAll({
      limit: limit,
      offset: offset,
      $sort: qs?.sort,
    });

    return cb(null, {
      jobSkills: job_skills,
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

    let job_skill = await JobSkill.findAll(searchCondition);

    return cb(null, job_skill);
  } catch (err) {
    return cb(err);
  }
};

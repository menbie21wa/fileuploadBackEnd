var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var JobSkillDal = require('../dal/jobSkill');

generateRandomNumber = (digit) => {
  let number_digit = '1';
  let multiplier = '9';

  for (let index = 1; index < digit; index++) {
    number_digit += '0';
    multiplier += '9';
  }

  let generatedNumber = Math.floor(
    Number(number_digit) + Math.random() * Number(multiplier)
  );
  return String(generatedNumber).substring(0, digit);
};

exports.createJobSkill = (req, res, next) => {
  var workflow = new EventEmitter();

  var jobSkillData = req.body;

  workflow.on('validateData', (jobSkillData) => {
    if (!jobSkillData.skill || jobSkillData.skill === '') {
      return res.status(400).json({ message: 'እባክዎ ስኪልዎን ያስገቡ' });
    }
    if (!jobSkillData.orgId || jobSkillData.orgId === '') {
      return res.status(400).json({ message: 'የድርጅትዎን መለያ ያስገቡ' });
    }
    //workflow.emit('createJobSkills', jobSkillData);

    workflow.emit('checkJobSkillExist', jobSkillData);
  });

  workflow.on('checkJobSkillExist', (jobSkillData) => {
    let jobskillQuery = {
      where: {
        orgId: jobSkillData.orgId,
      },
    };

    JobSkillDal.get(jobskillQuery, (err, jobSkill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (jobSkill === null || jobSkill === undefined) {
        workflow.emit('createJobSkill', jobSkillData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });

  workflow.on('createJobSkill', (jobSkillData) => {
    JobSkillDal.create(jobSkillData, (err, jobSkill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', jobSkill);
    });
  });

  workflow.on('respond', (jobSkill) => {
    res.status(200).json(jobSkill);
  });

  workflow.emit('validateData', jobSkillData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchJobSkill', () => {
    JobSkillDal.getByPk(id, (err, skill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!skill || skill === null || skill === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የስራ ስኪል የለም',
        });
      }

      workflow.emit('respond', skill);
    });
  });

  workflow.on('respond', (skill) => {
    res.status(200).json(skill);
  });

  workflow.emit('fetchJobSkill');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkJobSkillExist', (updatePayload) => {
    let jobSkillQuery = {
      where: {
        id: id,
      },
    };
    JobSkillDal.get(jobSkillQuery, (err, job_skill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!job_skill || job_skill === null || job_skill === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ አክሲዎን የለም',
        });
      }

      workflow.emit('updateJobSkill', updatePayload);
    });
  });

  workflow.on('updateJobSkill', (updatePayload) => {
    let jobSkillQuery = {
      where: {
        id: id,
      },
    };

    JobSkillDal.update(updatePayload, jobSkillQuery, (err, job_skill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!job_skill || job_skill.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', job_skill);
    });
  });

  workflow.on('getUpdatedData', (job_skill) => {
    JobSkillDal.getByPk(id, (err, jobskillUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', jobskillUpdated);
    });
  });

  workflow.on('respond', (jobskillUpdated) => {
    res.status(200).json(jobskillUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkJobSkillExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchJobSkill', () => {
    JobSkillDal.getByPk(req.params.id, (err, job_skill) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!job_skill) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ፕላን የለም',
        });
      }

      workflow.emit('deleteJobSkill', job_skill);
    });
  });

  workflow.on('deleteJobSkill', (job_skill) => {
    JobSkillDal.delete(job_skill.id, (err, deletedJobSkill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedJobSkill || Object.keys(deletedJobSkill).length > 0) {
        workflow.emit('respond', deletedJobSkill);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ፕላን የለም' });
      }
    });
  });

  workflow.on('respond', (jobSkill) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${jobSkill.id} የተመዘገበ ጠፍቶል` });
  });

  workflow.emit('findJobSkill');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllJobSkills', () => {
    JobSkillDal.getCollection({}, (err, job_skill) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (job_skill && job_skill.length > 0) {
        workflow.emit('respond', job_skill);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }
    });
  });

  workflow.on('respond', (job_skill) => {
    // delete user.password;
    res.status(200).json(job_skill);
  });

  workflow.emit('fetchAllJobSkills');
};

exports.fetchAllByPagination = (req, res, next) => {
  let workflow = new EventEmitter();

  let page = req.query.page || 1;
  let limit = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit,
    sort: { createdAt: -1 },
  };

  var jobSkillsQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    jobSkillsQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getJobSkills', (jobSkillsQuery) => {
    JobSkillDal.getByPagination(jobSkillsQuery, opts, (err, job_skills) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', job_skills);
    });
  });

  workflow.on('respond', (job_skills) => {
    res.status(200).json(job_skills);
  });

  workflow.emit('getJobSkills', jobSkillsQuery);
};

exports.search = (req, res, next) => {
  let workflow = new EventEmitter();

  let page = req.query.page || 1;
  let limit = req.query.per_page || 10;

  var opts = {
    page: page,
    limit: limit,
    sort: { createdAt: -1 },
  };

  workflow.on('prepareSearchQuery', () => {
    if (req.query.key && req.query.key !== '') {
      let searchKey = String(req.query.key).toLowerCase();

      workflow.emit('searchJobSkills', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchJobSkills', (searchKey) => {
    JobSkillDal.search(searchKey, opts, (err, job_skills) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', job_skills);
    });
  });

  workflow.on('respond', (job_skills) => {
    res.status(200).json(job_skills);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

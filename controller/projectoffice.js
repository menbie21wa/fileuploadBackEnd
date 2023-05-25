var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var ProjectDal = require('../dal/projectoffice');

//all are files

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

exports.createProject = (req, res, next) => {
  var workflow = new EventEmitter();

  var projectData = JSON.parse(JSON.stringify(req.body));

  workflow.on('validateData', (projectData) => {
    //workflow.emit('createProject', projectData);
    workflow.emit('checkProjectExist', projectData);
  });

  workflow.on('checkProjectExist', (projectData) => {
    let orgQuery = {
      where: {
        orgId: projectData.orgId,
      },
    };

    ProjectDal.get(orgQuery, (err, project) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!project || project === null || project === undefined) {
        workflow.emit('createProject', projectData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });
  workflow.on('createProject', (projectData) => {
    ProjectDal.create(projectData, (err, project) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', project);
    });
  });
  workflow.on('respond', (project) => {
    res.status(200).json(project);
  });

  workflow.emit('validateData', projectData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchProject', () => {
    ProjectDal.getByPk(id, (err, project) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (project || project !== undefined) {
        workflow.emit('respond', project);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ኣክሲዎን የለም',
        });
      }
    });
  });

  workflow.on('respond', (project) => {
    res.status(200).json(project);
  });

  workflow.emit('fetchProject');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkProjectExist', (updatePayload) => {
    let projectQuery = {
      where: {
        id: id,
      },
    };
    ProjectDal.get(projectQuery, (err, project) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!project || project === null || project === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ አክሲዎን የለም',
        });
      }

      workflow.emit('updateProject', updatePayload);
    });
  });

  workflow.on('updateProject', (updatePayload) => {
    let projectQuery = {
      where: {
        id: id,
      },
    };

    ProjectDal.update(updatePayload, projectQuery, (err, project) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!project || project.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', project);
    });
  });

  workflow.on('getUpdatedData', (project) => {
    ProjectDal.getByPk(id, (err, projectUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', projectUpdated);
    });
  });

  workflow.on('respond', (projectUpdated) => {
    res.status(200).json(projectUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkProjectExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchProject', () => {
    ProjectDal.getByPk(req.params.id, (err, project) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!project) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ፕሮጀችት የለም',
        });
      }

      workflow.emit('deleteProject', project);
    });
  });

  workflow.on('deleteProject', (project) => {
    ProjectDal.delete(project.id, (err, deletedProject) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedProject || Object.keys(deletedProject).length > 0) {
        workflow.emit('respond', deletedProject);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ፕሮጀችት የለም' });
      }
    });
  });

  workflow.on('respond', (project) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${project.id} የተመዘገበ ፕሮጀችት ጠፍቶል` });
  });

  workflow.emit('findProject');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllProjects', () => {
    ProjectDal.getCollection({}, (err, projects) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (projects && projects.length > 0) {
        workflow.emit('respond', projects);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ፕሮጀችት የለም',
        });
      }
    });
  });

  workflow.on('respond', (project) => {
    // delete user.password;
    res.status(200).json(project);
  });

  workflow.emit('fetchAllProjects');
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

  var projectsQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    projectsQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getProjects', (projectsQuery) => {
    ProjectDal.getByPagination(projectsQuery, opts, (err, projects) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', projects);
    });
  });

  workflow.on('respond', (projects) => {
    res.status(200).json(projects);
  });

  workflow.emit('getProjects', projectsQuery);
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

      workflow.emit('searchStocks', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchProjects', (searchKey) => {
    ProjectDal.search(searchKey, opts, (err, projects) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', projects);
    });
  });

  workflow.on('respond', (projects) => {
    res.status(200).json(projects);
  });

  workflow.emit('prepareSearchQuery');
};

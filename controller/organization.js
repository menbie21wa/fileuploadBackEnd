var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
let UserDal = require('../dal/user');
var OrgDal = require('../dal/organization');

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

exports.createOrg = (req, res, next) => {
  let workflow = new EventEmitter();
  let orgData = req.body;

  workflow.on('validateData', (orgData) => {
    if (!orgData.name) {
      return res.status(400).json({ message: 'እባክዎ የድርጂትዎን ስም ያስገቡ' });
    }

    if (!orgData.tinNumber) {
      return res
        .status(400)
        .json({ message: ' እባክዎት ድርጂት የግብር መለያ ቁጥር ያስገቡ ያስገቡ' });
    }
    if (!orgData.type) {
      return res.status(400).json({ message: 'የድርጂትዎን አይነት ያስገቡ' });
    }
    if (!orgData.userId) {
      return res.status(400).json({
        message: 'እባክዎ የአድሚን ዩዘር መለያ ያስገቡ',
      });
    }
    workflow.emit('checkOrgExist', orgData);
  });
  workflow.on('checkOrgExist', (orgData) => {
    let orgQuery = {
      where: {
        [Op.and]: [
          {
            userId: {
              [Op.eq]: orgData.userId,
            },
          },
          {
            tinNumber: {
              [Op.eq]: orgData.tinNumber,
            },
          },
        ],
      },
    };
    OrgDal.get(orgQuery, (err, org) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!org || org === null || org === undefined) {
        workflow.emit('createOrg', orgData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });
  workflow.on('createOrg', (orgData) => {
    let org_code = generateRandomNumber(6);
    orgData['orgCode'] = org_code;
    OrgDal.create(orgData, (err, org) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('updateUserRole', org);
    });
  });
  workflow.on('updateUserRole', (org) => {
    let updateQuery = {
      where: { id: org.userId },
    };
    let updatePayload = {
      role: 'super_admin',
    };

    UserDal.update(updatePayload, updateQuery, (err, user) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', org);
    });
  });
  workflow.on('respond', (org) => {
    res.status(200).json(org);
  });

  workflow.emit('validateData', orgData);
};

exports.fetchStocks = (req, res, next) => {
  let workflow = new EventEmitter();

  let _user = req._user;

  workflow.on('fetchOrg', () => {
    let orgQuery = {
      where: {
        userId: _user.id,
      },
    };

    OrgDal.getCollection(orgQuery, (err, orgs) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!org.length > 0) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጂት የለም',
        });
      }
      workflow.emit('respond', orgs);
    });
  });

  workflow.on('respond', (orgs) => {
    res.status(200).json(orgs);
  });

  workflow.emit('fetchOrg');
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchOrg', () => {
    OrgDal.getByPk(id, (err, org) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (org || org !== undefined) {
        workflow.emit('respond', org);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጂት የለም',
        });
      }
    });
  });

  workflow.on('respond', (org) => {
    res.status(200).json(org);
  });

  workflow.emit('fetchOrg');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkOrgExist', (updatePayload) => {
    let orgQuery = {
      where: {
        id: id,
      },
    };
    OrgDal.get(orgQuery, (err, org) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!org || org === null || org === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጂት የለም',
        });
      }

      workflow.emit('updateStock', updatePayload);
    });
  });

  workflow.on('updateStock', (updatePayload) => {
    let orgQuery = {
      where: {
        id: id,
      },
    };

    OrgDal.update(updatePayload, orgQuery, (err, org) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!org || org.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', org);
    });
  });

  workflow.on('getUpdatedData', (org) => {
    OrgDal.getByPk(id, (err, orgUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', orgUpdated);
    });
  });

  workflow.on('respond', (orgUpdated) => {
    res.status(200).json(orgUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkOrgExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchOrg', () => {
    OrgDal.getByPk(req.params.id, (err, org) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!org) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }

      workflow.emit('deleteOrg', org);
    });
  });

  workflow.on('deleteOrg', (org) => {
    OrgDal.delete(org.id, (err, deletedOrg) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedOrg) {
        workflow.emit('respond', deletedOrg);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ድርጂት የለም የለም' });
      }
    });
  });

  workflow.on('respond', (org) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${org.id} የተመዘገበ ድርጅት ጠፍቶል` });
  });

  workflow.emit('findOrg');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllOrgs', () => {
    OrgDal.getCollection({}, (err, orgs) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (orgs && orgs.length > 0) {
        workflow.emit('respond', orgs);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }
    });
  });

  workflow.on('respond', (org) => {
    // delete user.password;
    res.status(200).json(org);
  });

  workflow.emit('fetchAllOrgs');
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

  var orgsQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    orgsQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getOrgs', (orgsQuery) => {
    OrgDal.getByPagination(orgsQuery, opts, (err, orgs) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', orgs);
    });
  });

  workflow.on('respond', (orgs) => {
    res.status(200).json(orgs);
  });

  workflow.emit('getOrgs', orgsQuery);
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
  workflow.on('searchStocks', (searchKey) => {
    OrgDal.search(searchKey, opts, (err, stocks) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', stocks);
    });
  });

  workflow.on('respond', (stocks) => {
    res.status(200).json(stocks);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var LegalityDal = require('../dal/legality');

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

exports.createLegality = (req, res, next) => {
  var workflow = new EventEmitter();

  var legalityData = JSON.parse(JSON.stringify(req.body));

  workflow.on('validateData', (legalityData) => {
    if (
      fileData.ruleRegulation &&
      fileData.ruleRegulation[0].fieldname !== ''
    ) {
      legalityData.ruleRegulation = fileData.ruleRegulation[0].originalname;
    }
    if (fileData.businessName && fileData.businessName[0].fieldname !== '') {
      legalityData.businessName = fileData.businessName[0].originalname;
    }
    if (fileData.agreement && fileData.agreement[0].fieldname !== '') {
      legalityData.agreement = fileData.agreement[0].originalname;
    }
    if (
      fileData.registrationLicense &&
      fileData.registrationLicense[0].fieldname !== ''
    ) {
      legalityData.registrationLicense =
        fileData.registrationLicense[0].originalname;
    }
    if (
      fileData.businessLicense &&
      fileData.businessLicense[0].fieldname !== ''
    ) {
      legalityData.businessLicense = fileData.businessLicense[0].originalname;
    }
    if (fileData.taxPayerID && fileData.taxPayerID[0].fieldname !== '') {
      legalityData.taxPayerID = fileData.taxPayerID[0].originalname;
    }
    if (fileData.legalReceipts && fileData.legalReceipts[0].fieldname !== '') {
      legalityData.legalReceipts = fileData.legalReceipts[0].originalname;
    }
    if (
      fileData.professionalLicense &&
      fileData.professionalLicense[0].fieldname !== ''
    ) {
      legalityData.professionalLicense =
        fileData.professionalLicense[0].originalname;
    }
    if (fileData.accountCheck && fileData.accountCheck[0].fieldname !== '') {
      legalityData.accountCheck = fileData.accountCheck[0].originalname;
    }
    if (
      fileData.acceptedProject &&
      fileData.acceptedProject[0].fieldname !== ''
    ) {
      legalityData.acceptedProject = fileData.acceptedProject[0].originalname;
    }
    legalityData['orgId'] = legalityData.orgId;

    workflow.emit('checkLegalityExist', legalityData);
  });

  workflow.on('checkLegalityExist', (legalityData) => {
    let orgQuery = {
      where: {
        orgId: legalityData.orgId,
      },
    };

    LegalityDal.get(orgQuery, (err, legality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!legality) {
        workflow.emit('createLegality', legalityData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });

  workflow.on('createLegality', (legalityData) => {
    LegalityDal.create(legalityData, (err, legality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', legality);
    });
  });

  workflow.on('respond', (legality) => {
    res.status(200).json(legality);
  });

  let fileData = req.files;
  //console.log('fileData', fileData);

  workflow.emit('validateData', legalityData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchLegality', () => {
    LegalityDal.getByPk(id, (err, legality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (legality) {
        workflow.emit('respond', legality);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ሃሳብ የለም',
        });
      }
    });
  });

  workflow.on('respond', (legality) => {
    res.status(200).json(legality);
  });

  workflow.emit('fetchLegality');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkLegalityExist', (updatePayload) => {
    let legalityQuery = {
      where: {
        id: id,
      },
    };
    LegalityDal.get(legalityQuery, (err, legality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!legality) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ሃሳብ የለም',
        });
      }

      workflow.emit('updateLegality', updatePayload);
    });
  });

  workflow.on('updateLegality', (updatePayload) => {
    let legalityQuery = {
      where: {
        id: id,
      },
    };

    LegalityDal.update(updatePayload, legalityQuery, (err, legality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!legality || legality.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', legality);
    });
  });

  workflow.on('getUpdatedData', (legality) => {
    LegalityDal.getByPk(id, (err, legalityUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', legalityUpdated);
    });
  });

  workflow.on('respond', (legalityUpdated) => {
    res.status(200).json(legalityUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkLegalityExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchLegality', () => {
    LegalityDal.getByPk(req.params.id, (err, legality) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!legality) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የለም',
        });
      }

      workflow.emit('deleteLegality', legality);
    });
  });

  workflow.on('deleteLegality', (legality) => {
    LegalityDal.delete(legality.id, (err, deletedLegality) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedLegality) {
        workflow.emit('respond', deletedLegality);
      } else {
        return res.status(400).json({ message: 'የተመዘገበ የለም' });
      }
    });
  });

  workflow.on('respond', (legality) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${legality.id} የተመዘገበ ጠፍቶል` });
  });

  workflow.emit('findLegality');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllLegalities', () => {
    LegalityDal.getCollection({}, (err, legalities) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!legalities) {
        return res.status(200).json([]);
      }
      workflow.emit('respond', legalities);
    });
  });

  workflow.on('respond', (legalities) => {
    res.status(200).json(legalities);
  });

  workflow.emit('fetchAllLegalities');
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

  var legalitiesQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    legalitiesQuery['$or'] = [
      { idea: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getLegalities', (legalitiesQuery) => {
    LegalityDal.getByPagination(legalitiesQuery, opts, (err, legalities) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', legalities);
    });
  });

  workflow.on('respond', (legalities) => {
    res.status(200).json(legalities);
  });

  workflow.emit('getLegalities', legalitiesQuery);
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

      workflow.emit('searchLegalities', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchLegalities', (searchKey) => {
    LegalityDal.search(searchKey, opts, (err, legalities) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', legalities);
    });
  });

  workflow.on('respond', (legalities) => {
    res.status(200).json(legalities);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var PropertyDal = require('../dal/property');

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

exports.createProperty = (req, res, next) => {
  var workflow = new EventEmitter();

  var propertyData = req.body;

  workflow.on('validateData', (propertyData) => {
    if (!propertyData.orgId || propertyData.orgId === '') {
      return res.status(400).json({ message: 'የድርጅትዎን መለያ ያስገቡ' });
    }

    workflow.emit('checkPropertyExist', propertyData);
  });

  workflow.on('checkPropertyExist', (propertyData) => {
    let propertyQuery = {
      where: {
        orgId: propertyData.orgId,
      },
    };

    PropertyDal.get(propertyQuery, (err, property) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!property) {
        workflow.emit('createProperty', propertyData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });

  workflow.on('createProperty', (propertyData) => {
    PropertyDal.create(propertyData, (err, property) => {
      console.log('property');
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', property);
    });
  });

  workflow.on('respond', (property) => {
    res.status(200).json(property);
  });

  workflow.emit('validateData', propertyData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchProperty', () => {
    PropertyDal.getByPk(id, (err, peroperty) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!peroperty) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ማተሪኣል የለም',
        });
      }
      workflow.emit('respond', peroperty);
    });
  });

  workflow.on('respond', (property) => {
    res.status(200).json(property);
  });

  workflow.emit('fetchProperty');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkPropertyExist', (updatePayload) => {
    let propertyQuery = {
      where: {
        id: id,
      },
    };
    PropertyDal.get(propertyQuery, (err, property) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!property || property === null || property === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ማተሪኣል የለም',
        });
      }

      workflow.emit('updateProperty', updatePayload);
    });
  });

  workflow.on('updateProperty', (updatePayload) => {
    let propertyQuery = {
      where: {
        id: id,
      },
    };

    PropertyDal.update(updatePayload, propertyQuery, (err, property) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!property || property.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', property);
    });
  });

  workflow.on('getUpdatedData', (property) => {
    PropertyDal.getByPk(id, (err, propertyUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', propertyUpdated);
    });
  });

  workflow.on('respond', (propertyUpdated) => {
    res.status(200).json(propertyUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkPropertyExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchProperty', () => {
    PropertyDal.getByPk(req.params.id, (err, property) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!property) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }

      workflow.emit('deleteProperty', property);
    });
  });

  workflow.on('deleteProperty', (property) => {
    PropertyDal.delete(property.id, (err, deletedProperty) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedProperty || Object.keys(deletedProperty).length > 0) {
        workflow.emit('respond', deletedProperty);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ማተሪኣል የለም' });
      }
    });
  });

  workflow.on('respond', (property) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${property.id} የተመዘገበ ማተሪኣል ጠፍቶል` });
  });

  workflow.emit('findProperty');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllProperties', () => {
    PropertyDal.getCollection({}, (err, property) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (property && property.length > 0) {
        workflow.emit('respond', property);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }
    });
  });

  workflow.on('respond', (property) => {
    // delete user.password;
    res.status(200).json(property);
  });

  workflow.emit('fetchAllProperties');
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

  var propertiesQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    propertiesQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getProperties', (propertiesQuery) => {
    PropertyDal.getByPagination(propertiesQuery, opts, (err, properties) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', properties);
    });
  });

  workflow.on('respond', (properties) => {
    res.status(200).json(properties);
  });

  workflow.emit('getProperties', propertiesQuery);
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

      workflow.emit('searchProperties', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchProperties', (searchKey) => {
    PropertyDal.search(searchKey, opts, (err, peroperties) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', peroperties);
    });
  });

  workflow.on('respond', (properties) => {
    res.status(200).json(properties);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var PromotionDal = require('../dal/promotion');

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

exports.createPromotion = (req, res, next) => {
  var workflow = new EventEmitter();

  var promotionData = req.body;

  workflow.on('validateData', (promotionData) => {
    if (!promotionData.orgId || promotionData.orgId === '') {
      return res.status(400).json({ message: 'እባክዎ የድርጅትዎን መለያ ያስገቡ' });
    }
    //workflow.emit('createPromotion', promotionData);
    workflow.emit('checkPromotionExist', promotionData);
  });
  workflow.on('checkPromotionExist', (promotionData) => {
    let promotionQuery = {
      where: {
        orgId: promotionData.orgId,
      },
    };
    PromotionDal.get(promotionQuery, (err, promotion) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!promotion || promotion === null || promotion === undefined) {
        workflow.emit('createPromotion', promotionData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });
  workflow.on('createPromotion', (promotionData) => {
    PromotionDal.create(promotionData, (err, promotion) => {
      if (err) {
        return res.status(500).json({
          message: 'server error',
        });
      }
      workflow.emit('respond', promotion);
    });
  });

  workflow.on('respond', (promotion) => {
    res.status(200).json(promotion);
  });

  workflow.emit('validateData', promotionData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchPromotion', () => {
    PromotionDal.getByPk(id, (err, promotion) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (promotion || promotion !== undefined) {
        workflow.emit('respond', promotion);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የለም',
        });
      }
    });
  });

  workflow.on('respond', (promotion) => {
    res.status(200).json(promotion);
  });

  workflow.emit('fetchPromotion');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkPromotionExist', (updatePayload) => {
    let promotionQuery = {
      where: {
        id: id,
      },
    };
    PromotionDal.get(promotionQuery, (err, promotion) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!promotion || promotion === null || promotion === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ አክሲዎን የለም',
        });
      }

      workflow.emit('updatePromotion', updatePayload);
    });
  });

  workflow.on('updatePromotion', (updatePayload) => {
    let promotionQuery = {
      where: {
        id: id,
      },
    };

    PromotionDal.update(updatePayload, promotionQuery, (err, promotion) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!promotion || promotion.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', promotion);
    });
  });

  workflow.on('getUpdatedData', (promotion) => {
    PromotionDal.getByPk(id, (err, promotionUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', promotionUpdated);
    });
  });

  workflow.on('respond', (promotionUpdated) => {
    res.status(200).json(promotionUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkPromotionExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchPromotion', () => {
    PromotionDal.getByPk(req.params.id, (err, promotion) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!promotion) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ፕሮሞሽን የለም',
        });
      }

      workflow.emit('deletePromotion', promotion);
    });
  });

  workflow.on('deletePromotion', (promotion) => {
    PromotionDal.delete(promotion.id, (err, deletedPromotion) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedPromotion || Object.keys(deletedPromotion).length > 0) {
        workflow.emit('respond', deletedPromotion);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ፕሮሞሽን የለም' });
      }
    });
  });

  workflow.on('respond', (promotion) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${promotion.id} የተመዘገበ ፕሮሞሽን ጠፍቶል` });
  });

  workflow.emit('findPromotion');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllPromotions', () => {
    PromotionDal.getCollection({}, (err, promotions) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (promotions && promotions.length > 0) {
        workflow.emit('respond', promotions);
      } else {
        return res.status(400).json([]);
      }
    });
  });

  workflow.on('respond', (promotion) => {
    // delete user.password;
    res.status(200).json(promotion);
  });

  workflow.emit('fetchAllPromotions');
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

  var promotionsQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    promotionsQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getPromotions', (promotionsQuery) => {
    PromotionDal.getByPagination(promotionsQuery, opts, (err, promotions) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', promotions);
    });
  });

  workflow.on('respond', (promotions) => {
    res.status(200).json(promotions);
  });

  workflow.emit('getPromotions', promotionsQuery);
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

      workflow.emit('searchPromotions', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchPromotions', (searchKey) => {
    PromotionDal.search(searchKey, opts, (err, promotions) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', promotions);
    });
  });

  workflow.on('respond', (promotions) => {
    res.status(200).json(promotions);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

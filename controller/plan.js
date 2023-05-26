var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var PlanDal = require('../dal/plan');

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

exports.createPlan = (req, res, next) => {
  var workflow = new EventEmitter();

  var planData = req.body;

  workflow.on('validateData', (planData) => {
    if (!planData.orgId || planData.orgId === '') {
      return res.status(400).json({ message: 'እባክዎ ' });
    }

    workflow.emit('checkPlanExist', planData);
  });

  workflow.on('checkPlanExist', (planData) => {
    let orgId = planData.orgId;

    let planQuery = {
      where: {
        orgId: orgId,
      },
    };

    PlanDal.get(planQuery, (err, plan) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!plan) {
        console.log('here', plan);
        workflow.emit('createPlan', planData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });
  workflow.on('createPlan', (planData) => {
    PlanDal.create(planData, (err, plan) => {
      if (err) {
        return res.status(500).json({
          message: 'server error',
        });
      }
      workflow.emit('respond', plan);
    });
  });

  workflow.on('respond', (plan) => {
    res.status(200).json(plan);
  });

  workflow.emit('validateData', planData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchPlan', () => {
    PlanDal.getByPk(id, (err, plan) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (plan || plan !== undefined) {
        workflow.emit('respond', plan);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ኣክሲዎን የለም',
        });
      }
    });
  });

  workflow.on('respond', (plan) => {
    res.status(200).json(plan);
  });

  workflow.emit('fetchPlan');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkPlanExist', (updatePayload) => {
    let planQuery = {
      where: {
        id: id,
      },
    };
    PlanDal.get(planQuery, (err, plan) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!plan || plan === null || plan === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ አክሲዎን የለም',
        });
      }

      workflow.emit('updatePlan', updatePayload);
    });
  });

  workflow.on('updatePlan', (updatePayload) => {
    let planQuery = {
      where: {
        id: id,
      },
    };

    PlanDal.update(updatePayload, planQuery, (err, plan) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!plan || plan.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', plan);
    });
  });

  workflow.on('getUpdatedData', (plan) => {
    PlanDal.getByPk(id, (err, planUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', planUpdated);
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
  workflow.emit('checkPlanExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchPlan', () => {
    PlanDal.getByPk(req.params.id, (err, plan) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!plan) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ፕላን የለም',
        });
      }

      workflow.emit('deletePlan', plan);
    });
  });

  workflow.on('deletePlan', (plan) => {
    PlanDal.delete(plan.id, (err, deletedPlan) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedPlan || Object.keys(deletedPlan).length > 0) {
        workflow.emit('respond', deletedPlan);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ ፕላን የለም' });
      }
    });
  });

  workflow.on('respond', (plan) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${plan.id} የተመዘገበ ፕላን ጠፍቶል` });
  });

  workflow.emit('findPlan');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllPlans', () => {
    PlanDal.getCollection({}, (err, plans) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (plans && plans.length > 0) {
        workflow.emit('respond', plans);
      } else {
        return res.status(400).json([]);
      }
    });
  });
  workflow.on('respond', (plans) => {
    res.status(200).json(plans);
  });

  workflow.emit('fetchAllPlans');
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

  var plansQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    plansQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getPlans', (plansQuery) => {
    PlanDal.getByPagination(plansQuery, opts, (err, plans) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', plans);
    });
  });

  workflow.on('respond', (plans) => {
    res.status(200).json(plans);
  });

  workflow.emit('getPlans', plansQuery);
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

      workflow.emit('searchPlans', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchPlans', (searchKey) => {
    PlanDal.search(searchKey, opts, (err, plans) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', plans);
    });
  });

  workflow.on('respond', (plans) => {
    res.status(200).json(plans);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

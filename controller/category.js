var EventEmitter = require('events').EventEmitter;
// const bcrypt = require("bcrypt");
const moment = require('moment');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const categoryDal = require('../dal/category');

//create start
exports.createCategory = (req, res, next) => {
  var workflow = new EventEmitter();

  var categoryData = JSON.parse(JSON.stringify(req.body));

  workflow.on('validateData', (categoryData) => {
    if (!categoryData.name || categoryData.name === '') {
      return res.status(400).json({ message: 'እባክዎ የዕቃውን category ያስገቡ' });
    }

    //workflow.emit('checkPlanExist', planData);
    workflow.emit('createCategory', categoryData);
  });

  workflow.on('createCategory', (categoryData) => {
    categoryDal.create(categoryData, (err, category) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', category);
    });
  });

  workflow.on('respond', (category) => {
    res.status(200).json(category);
  });

  workflow.emit('validateData', categoryData);
};
//create end
//fetchall start
exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  let searchKey = {};
  if (req?.query?.key) {
    searchKey = req.query.key.toLowerCase();
  } else {
    searchKey = undefined;
  }

  workflow.on('fetchAllCategory', () => {
    categoryDal.getCollection(searchKey, (err, category) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      if (category && category.length > 0) {
        workflow.emit('respond', category);
      } else {
        res.status(400).json({
          message: 'Products category not found',
        });
        return;
      }
    });
  });

  workflow.on('respond', (category) => {
    // users?.map(_user=>{
    //  delete _user?.dataValues.password
    // })
    res.status(200).json(category);
  });

  workflow.emit('fetchAllCategory');
};
//fetchall end

//searchUser start
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

      workflow.emit('searchCategories', searchKey);
    } else {
      res.status(400).json({ message: 'Search key not found' });
      return;
    }
  });
  workflow.on('searchCategories', (searchKey) => {
    categoryDal.search(searchKey, opts, (err, category) => {
      if (err) {
        res.status(500).json({
          message: 'SERVER_ERROR',
        });
        return;
      }
      workflow.emit('respond', category);
    });
  });

  workflow.on('respond', (category) => {
    if (category?.length > 0)
      category.map((_category) => delete _category?.dataValues.password);

    res.status(200).json(category);
    return;
  });

  workflow.emit('prepareSearchQuery');
};
//searchUser end

//fetchbyId start
exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('fetchSpecification', () => {
    categoryDal.getByPk(id, (err, category) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      if (category && Object.keys(category).length > 0) {
        workflow.emit('respond', category);
      } else {
        res.status(400).json({
          message: 'ባስገቡት መረጃ የተመዘገበ category የለም',
        });
        return;
      }
    });
  });

  workflow.on('respond', (category) => {
    delete category.password;
    res.json(category);
  });

  workflow.emit('fetchSpecification');
};
//fetchbyId  end

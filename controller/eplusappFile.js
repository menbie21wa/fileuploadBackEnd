var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
var fileDal = require('../dal/eplusappFile');


exports.createFile = (req, res, next) => {
  let workflow = new EventEmitter();
  let fileData = req.body;

  workflow.on('validateData', (fileData) => {
    if (!fileData.fileName) {
      return res.status(400).json({ message: 'እባክዎ የፋይሉን ስም ያስገቡ' });
    }
   if(!fileData.type){
    return res.status(400).json({
      message: 'select file type',
    })
   }else{
    workflow.emit('createFile',fileData);
   }
    });
  workflow.on('createFile', (fileData) => {

    fileDal.create(fileData, (err, file) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', file);
    });
  });

  workflow.on('respond', (file) => {
    res.status(200).json(file);
  });

  workflow.emit('validateData', fileData);
};
exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllFiles', () => {
    fileDal.getCollection({}, (err, file) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (file && file.length > 0) {
        workflow.emit('respond', file);
      } else {
        return res.status(400).json({
          message: 'file not found'
        });
      }
    });
  });

  workflow.on('respond', (files) => {
    res.status(200).json(files);
  });

  workflow.emit('fetchAllFiles');
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchFile', () => {
    fileDal.getByPk(id, (err, file) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (file || file !== undefined) {
        workflow.emit('respond', file);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ file የለም',
        });
      }
    });
  });

  workflow.on('respond', (files) => {
    res.status(200).json(files);
  });

  workflow.emit('fetchFile');
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('findFile', () => {
    fileDal.getByPk(req.params.id, (err, file) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!file) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }

      workflow.emit('deleteFile', file);
    });
  });

  workflow.on('deleteFile', (file) => {
    fileDal.delete(file.id, (err, deletedFile) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedFile) {
        workflow.emit('respond', deletedFile);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ file የለም የለም' });
      }
    });
  });

  workflow.on('respond', (file) => {
    return res
      .status(200)
      .json({ message: `በዚህ መለያ${file.id} የተመዘገበ file ጠፍቶል` });
  });

  workflow.emit('findFile');
};

exports.fetchAllByPagination = (req, res, next) => {
  let workflow = new EventEmitter();

  let page = req.query.page || 1;
  let limit = req.query.per_page || 5;

  var opts = {
    page: page,
    limit: limit,
    sort: { createdAt: -1 },
  };

  var fileQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    fileQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getFiles', (fileQuery) => {
    fileDal.getByPagination(fileQuery, opts, (err, files) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', files);
    });
  });

  workflow.on('respond', (files) => {
    res.status(200).json(files);
  });

  workflow.emit('getFiles', fileQuery);
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

      workflow.emit('searchFiles', searchKey);
    } else {
      res.status(400).json({ message: 'መፈለጊያ ቃል አላስገቡም' });
      return;
    }
  });
  workflow.on('searchFiles', (searchKey) => {
    fileDal.search(searchKey, opts, (err, files) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      workflow.emit('respond', files);
    });
  });

  workflow.on('respond', (files) => {
    res.status(200).json(files);
    return;
  });

  workflow.emit('prepareSearchQuery');
};

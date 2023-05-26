var EventEmitter = require('events').EventEmitter;

const moment = require('moment');
const fs = require('fs');
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const tefDal = require('../dal/tef_wof');

exports.createTef_Wof = (req, res, next) => {
  var workflow = new EventEmitter();

  var tefData = req.body;

  let loggedin_user = req._user;

  workflow.on('validateTefWofData', (tefData) => {
    if (!tefData.hope || !tefData.belief || !tefData.love) {
      res.status(400).json({
        message: 'ተስፋ ዕምነትና ፍቅር ማስገባት አለብዎት',
      });
      return;
    }

    if (!tefData.value || tefData.value === '') {
      res.status(400).json({
        message: 'እሴት ማስገባት አለብዎት',
      });
      return;
    }

    workflow.emit('checkUserExist', tefData);
  });

  workflow.on('checkUserExist', (tefData) => {
    let tefQuery = {
      where: {
        [Op.or]: [
          {
            userId: {
              [Op.eq]: loggedin_user.id,
            },
          },
          {
            orgId: {
              [Op.eq]: tefData.orgId,
            },
          },
        ],
      },
    };

    tefDal.get(tefQuery, (err, tef_wof) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!tef_wof) {
        workflow.emit('createTef_Wof', tefData);
      } else {
        return res.status(400).json({
          message: 'የራስዎን ተስፋ ዕምነትና ፍቅር ከዚህ በፊት ሞልተዋል ለማሻሻልም ከሆነ ኢዲት ያድርጉ ',
        });
      }
    });
  });

  workflow.on('createTef_Wof', (tefData) => {
    tefData['userId'] = loggedin_user.id;
    tefDal.create(tefData, (err, tef_wof) => {
      console.log('tef_wof', tef_wof);
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }

      workflow.emit('respond', tef_wof);
    });
  });

  workflow.on('respond', (tef_wof) => {
    res.status(201).json({
      tef_wof: tef_wof,
      message: 'በትክክል ተመዝግበዋል',
    });
  });

  workflow.emit('validateTefWofData', tefData);
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  let searchKey = {};
  if (req?.query?.key) {
    searchKey = req.query.key.toLowerCase();
  } else {
    searchKey = undefined;
  }

  workflow.on('fetchAllTefWof', () => {
    tefDal.getCollection(searchKey, (err, tef_wof) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
        return;
      }
      if (tef_wof && tef_wof.length > 0) {
        workflow.emit('respond', tef_wof);
      } else {
        res.status(400).json({
          message: 'Tef Wof not found',
        });
        return;
      }
    });
  });

  workflow.on('respond', (tef_wof) => {
    // users?.map(_user=>{
    //  delete _user?.dataValues.password
    // })
    res.status(200).json(tef_wof);
  });

  workflow.emit('fetchAllTefWof');
};
//fetchall end

//fetchbyId start
exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('fetchTefWof', () => {
    tefDal.getByPk(id, (err, tef_wof) => {
      if (err) {
        res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
        return;
      }
      if (tef_wof && Object.keys(tef_wof).length > 0) {
        workflow.emit('respond', tef_wof);
      } else {
        res.status(400).json({
          message: 'ባስገቡት መረጃ የተመዘገበ ተስፋ ዕምነትና ፍቅር የለም',
        });
        return;
      }
    });
  });

  workflow.on('respond', (tef_wof) => {
    delete tef_wof.password;
    res.json(tef_wof);
  });

  workflow.emit('fetchTefWof');
};
//fetchbyId  end

//deletebyId start
exports.remove = (req, res, next) => {
  // console.log("Archiving user:" + req.params.id);

  var workflow = new EventEmitter();

  workflow.on('findTefWof', () => {
    tefDal.getByPk(req.params.id, (err, tef_wof) => {
      if (err) {
        res.satus(500).json({
          name: 'SERVER_ERROR',
          message: err.message,
        });
        return;
      }
      if (!tef_wof) {
        res.status(400).json({
          name: 'DELETE_Tef_Wof_ERROR',
          message: 'tef wof Data Not Found',
        });
        return;
      }

      workflow.emit('deleteTefWof', tef_wof);
    });
  });

  workflow.on('deleteTefWof', (tef_wof) => {
    tefDal.delete(tef_wof.id, (err, deleteTefWof) => {
      if (err) {
        res.status(500).json({
          name: 'DELETE_Tef_Wof_ERROR',
          message: err.message,
        });
        return;
      }

      if (deleteTefWof || Object.keys(deleteTefWof).length > 0) {
        workflow.emit('respond', deleteTefWof);
      } else {
        res.status(400).json({ message: 'tef wof Data not found' });
        return;
      }
    });
  });

  workflow.on('respond', (tef_wof) => {
    res
      .status(200)
      .json({ message: `Tef Wof with id ${tef_wof.id} deleted successfully.` });
    return;
  });

  workflow.emit('findTefWof');
};
//deletebyId end

//update start
exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkTefExist', (updatePayload) => {
    let tefQuery = {
      where: {
        id: id,
      },
    };
    tefDal.get(tefQuery, (err, tef_wof) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!tef_wof || tef_wof === null || tef_wof === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የለም',
        });
      }

      workflow.emit('updateTef_Wof', updatePayload);
    });
  });

  workflow.on('updateTef_Wof', (updatePayload) => {
    let tefQuery = {
      where: {
        id: id,
      },
    };
    tefDal.update(updatePayload, tefQuery, (err, tef_wof) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!tef_wof || tef_wof.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', tef_wof);
    });
  });

  workflow.on('getUpdatedData', (tef_wof) => {
    tefDal.getByPk(id, (err, tefUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', tefUpdated);
    });
  });

  workflow.on('respond', (tefUpdated) => {
    res.status(200).json(tefUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkTefExist', updatePayload);
};
//update end

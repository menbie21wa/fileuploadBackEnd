var EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

var TrainingDal = require('../dal/training');

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

exports.createTraining = (req, res, next) => {
  var workflow = new EventEmitter();

  var trainingData = req.body;

  workflow.on('validateData', (trainingData) => {
    if (!trainingData.orgId || trainingData.orgId === '') {
      return res.status(400).json({ message: 'የድርጂትዎን መለያ ያስገቡ' });
    }
    workflow.emit('checkTrainingExist', trainingData);
  });

  workflow.on('checkTrainingExist', (trainingData) => {
    let orgId = trainingData.orgId;

    let orgQuery = {
      where: {
        orgId: orgId,
      },
    };

    TrainingDal.get(orgQuery, (err, training) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!training) {
        workflow.emit('createTraining', trainingData);
      } else {
        return res.status(400).json({
          message: 'መረጃው ካሁን በፊት ተመዝግቧል',
        });
      }
    });
  });

  workflow.on('createTraining', (trainingData) => {
    TrainingDal.create(trainingData, (err, training) => {
      if (err) {
        return res.status(500).json({
          message: 'server error',
        });
      }
      workflow.emit('respond', training);
    });
  });

  workflow.on('respond', (training) => {
    res.status(200).json(training);
  });

  workflow.emit('validateData', trainingData);
};

exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();

  var { id } = req.params;

  workflow.on('fetchTraining', () => {
    TrainingDal.getByPk(id, (err, training) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (training || training !== undefined) {
        workflow.emit('respond', training);
      } else {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የለም',
        });
      }
    });
  });

  workflow.on('respond', (training) => {
    res.status(200).json(training);
  });

  workflow.emit('fetchTraining');
};

exports.update = (req, res, next) => {
  var workflow = new EventEmitter();
  let { id } = req.params;

  workflow.on('checkTrainingExist', (updatePayload) => {
    let trainingQuery = {
      where: {
        id: id,
      },
    };
    TrainingDal.get(trainingQuery, (err, training) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!training || training === null || training === undefined) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ የለም',
        });
      }

      workflow.emit('updateTraining', updatePayload);
    });
  });

  workflow.on('updateTraining', (updatePayload) => {
    let trainingQuery = {
      where: {
        id: id,
      },
    };
    TrainingDal.update(updatePayload, trainingQuery, (err, training) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!training || training.length < 0) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('getUpdatedData', training);
    });
  });

  workflow.on('getUpdatedData', (training) => {
    TrainingDal.getByPk(id, (err, trainingUpdated) => {
      if (err) {
        return res.status(400).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', trainingUpdated);
    });
  });

  workflow.on('respond', (trainingUpdated) => {
    res.status(200).json(trainingUpdated);
  });

  let updatePayload = req.body;

  if (Object.keys(updatePayload).length === 0) {
    return res.status(400).json({
      message: 'ምንም ዳታ አላስገቡም',
    });
  }
  workflow.emit('checkTrainingExist', updatePayload);
};

exports.remove = (req, res, next) => {
  var workflow = new EventEmitter();

  workflow.on('fetchTraining', () => {
    TrainingDal.getByPk(req.params.id, (err, training) => {
      if (err) {
        return res.satus(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (!training) {
        return res.status(400).json({
          message: 'በዚህ መለያ የተመዘገበ ድርጅት የለም',
        });
      }

      workflow.emit('deleteTraining', training);
    });
  });

  workflow.on('deleteTraining', (training) => {
    TrainingDal.delete(training.id, (err, deletedTraining) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      if (deletedTraining || Object.keys(deletedTraining).length > 0) {
        workflow.emit('respond', deletedTraining);
      } else {
        return res.status(400).json({ message: 'በዚህ መለያ የተመዘገበ  የለም' });
      }
    });
  });

  workflow.on('respond', (training) => {
    return res.status(200).json({ message: `በዚህ መለያ${training.id} የተመዘገበ ` });
  });

  workflow.emit('fetchTraining');
};

exports.fetchAll = (req, res, next) => {
  let workflow = new EventEmitter();

  workflow.on('fetchAllTrainings', () => {
    TrainingDal.getCollection({}, (err, trainings) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      if (trainings && trainings.length > 0) {
        workflow.emit('respond', trainings);
      } else {
        return res.status(400).json([]);
      }
    });
  });

  workflow.on('respond', (trainings) => {
    // delete user.password;
    res.status(200).json(trainings);
  });

  workflow.emit('fetchAllTrainings');
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

  var trainingsQuery = {};

  if (req.query.key && req.query.key !== '') {
    let filterKey = String(req.query.key).toLowerCase();
    trainingsQuery['$or'] = [
      { name: { $regex: filterKey, $options: 'i' } },
      { code: { $regex: filterKey, $options: 'i' } },
      { type: { $regex: filterKey, $options: 'i' } },
    ];
  }

  workflow.on('getTrainings', (trainingsQuery) => {
    TrainingDal.getByPagination(trainingsQuery, opts, (err, trainings) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }

      workflow.emit('respond', trainings);
    });
  });

  workflow.on('respond', (trainings) => {
    res.status(200).json(trainings);
  });

  workflow.emit('getTrainings', trainingsQuery);
};

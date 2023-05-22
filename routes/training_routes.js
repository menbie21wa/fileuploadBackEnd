var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var trainingController = require('../controller/training');

router.post('/create', trainingController.createTraining);

router.get('/all', trainingController.fetchAll);

router.get('/paginate', trainingController.fetchAllByPagination);

//router.get('/search', trainingController.search);

router.get('/:id', trainingController.fetchOne);

router.put(
  '/:id',
  // authenticate,
  // authorization(['super_admin', 'admin', 'user', 'customer']),

  trainingController.update
);
router.delete('/:id', trainingController.remove);

// Expose User Router
module.exports = router;

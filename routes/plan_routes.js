var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var planController = require('../controller/plan');

router.post(
  '/create',

  planController.createPlan
);

router.get('/all', planController.fetchAll);

router.get('/paginate', planController.fetchAllByPagination);

router.get('/search', planController.search);

router.get('/:id', planController.fetchOne);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),

  planController.update
);
router.delete(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  planController.remove
);

// Expose User Router
module.exports = router;

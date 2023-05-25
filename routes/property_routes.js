var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var propertyController = require('../controller/property');

router.post('/create', propertyController.createProperty);

router.get('/all', propertyController.fetchAll);

router.get('/paginate', propertyController.fetchAllByPagination);

router.get('/search', propertyController.search);

router.get('/:id', propertyController.fetchOne);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),

  propertyController.update
);
router.delete(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  propertyController.remove
);

// Expose User Router
module.exports = router;

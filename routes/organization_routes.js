var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var organizationController = require('../controller/organization');

router.post('/create', organizationController.createOrg);

router.get('/all', organizationController.fetchAll);

router.get('/paginate', organizationController.fetchAllByPagination);

router.get('/search', organizationController.search);

router.get(
  '/stock',
  authenticate,
  authorization(['super_admin', 'admin']),
  organizationController.fetchStocks
);

router.get(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  organizationController.fetchOne
);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),

  organizationController.update
);
router.delete(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  organizationController.remove
);

// Expose User Router
module.exports = router;

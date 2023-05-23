var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');

var organizationController = require('../controller/organization');

router.post(
  '/create',
  authenticate,
  authorization(['super_admin', 'admin']),
  organizationController.createOrg
);

var organizationController = require('../controller/organization');

router.get('/all', organizationController.fetchAll);

router.get('/paginate', organizationController.fetchAllByPagination);

router.get('/search', organizationController.search);

router.get('/:id', organizationController.fetchOne);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),

  organizationController.update
);
router.delete('/:id', organizationController.remove);

// Expose User Router
module.exports = router;

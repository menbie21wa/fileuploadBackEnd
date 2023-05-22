var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
var { upload } = require('../lib/fileUpload');

var planController = require('../controller/plan');

router.post('/create', planController.createPlan);

router.get('/all', planController.fetchAll);

router.get('/paginate', planController.fetchAllByPagination);

router.get('/search', planController.search);

router.get('/:id', planController.fetchOne);

router.put(
  '/:id',
  // authenticate,
  // authorization(['super_admin', 'admin', 'user', 'customer']),
  upload.fields([
    {
      name: 'logo',
    },
    {
      name: 'file',
    },
  ]),
  planController.update
);
router.delete('/:id', planController.remove);

// Expose User Router
module.exports = router;

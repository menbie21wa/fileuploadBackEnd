var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
var { upload } = require('../lib/fileUpload');

var projectofficeController = require('../controller/projectoffice');

router.post('/create', projectofficeController.createProject);

router.get('/all', projectofficeController.fetchAll);

router.get('/paginate', projectofficeController.fetchAllByPagination);

router.get('/search', projectofficeController.search);

router.get('/:id', projectofficeController.fetchOne);

router.put(
  '/:id',
  // authenticate,
  // authorization(['super_admin', 'admin', 'user', 'customer']),

  projectofficeController.update
);
router.delete('/:id', projectofficeController.remove);

// Expose User Router
module.exports = router;

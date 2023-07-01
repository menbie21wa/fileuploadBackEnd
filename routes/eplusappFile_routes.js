var express = require('express');
var router = express.Router();

var eplusappFileController = require('../controller/eplusappFile');

router.post('/create',eplusappFileController.createFile);

router.get('/all', eplusappFileController.fetchAll);

router.get('/paginate', eplusappFileController.fetchAllByPagination);

router.get('/search', eplusappFileController.search);

router.get(
  '/:id',
  eplusappFileController.fetchOne
);
router.delete(
  '/:id',
  eplusappFileController.remove
);

// Expose User Router
module.exports = router;

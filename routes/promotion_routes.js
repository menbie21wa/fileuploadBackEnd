var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
var { upload } = require('../lib/fileUpload');

var promotionController = require('../controller/promotion');

router.post('/create', promotionController.createPromotion);

router.get('/all', promotionController.fetchAll);

router.get('/paginate', promotionController.fetchAllByPagination);

router.get('/search', promotionController.search);

router.get('/:id', promotionController.fetchOne);

router.put(
  '/:id',
  // authenticate,
  // authorization(['super_admin', 'admin', 'user', 'customer']),

  promotionController.update
);
router.delete('/:id', promotionController.remove);

// Expose User Router
module.exports = router;

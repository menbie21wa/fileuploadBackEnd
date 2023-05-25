const express = require('express');
const router = express.Router();

var authenticate        = require('../lib/authenticate');
var authorization       = require('../lib/authorization');
var productController = require('../controller/product');


router.post(
  '/create',
  authenticate,
  authorization(['super_admin', 'admin']),
  productController.createProduct
);

router.get('/all', productController.fetchAll);

router.get('/:id', productController.fetchOne);

router.delete(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),
  productController.remove
);
router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin']),

  productController.update
);
// Expose User Router
module.exports = router;

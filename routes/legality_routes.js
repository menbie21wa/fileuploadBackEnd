var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
var { upload } = require('../lib/fileUpload');

var legalityController = require('../controller/legality');

router.post(
  '/create',
  upload.fields([
    {
      name: 'ruleRegulation',
      maxCount: 1,
    },
    {
      name: 'businessName',
      maxCount: 1,
    },
    {
      name: 'agreement',
      maxCount: 1,
    },
    {
      name: 'registrationLicense',
      maxCount: 1,
    },
    {
      name: 'businessLicense',
      maxCount: 1,
    },
    {
      name: 'taxPayerID',
      maxCount: 1,
    },
    {
      name: 'legalReceipts',
      maxCount: 1,
    },
    {
      name: 'accountCheck',
      maxCount: 1,
    },
    {
      name: 'professionalLicense',
      maxCount: 1,
    },
    {
      name: 'acceptedProject',
      maxCount: 1,
    },
  ]),

  legalityController.createLegality
);

router.get('/all', legalityController.fetchAll);

router.get('/paginate', legalityController.fetchAllByPagination);

router.get('/search', legalityController.search);

router.get('/:id', legalityController.fetchOne);

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
  legalityController.update
);
router.delete('/:id', legalityController.remove);

// Expose User Router
module.exports = router;

var express = require('express');
var router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
var { upload } = require('../lib/fileUpload');

var fileuploadController = require('../controller/fileUpload');

router.post(
  '/uploadfile' /*authenticate,authorization(['super_admin','user']),*/,
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
    {
      name: 'logo',
      maxCount: 1,
    },
    {
      name: 'avatar',
      maxCount: 1,
    },
    {
      name: 'planForm',
      maxCount: 1,
    },
    {
      name: 'payrollForm',
      maxCount: 1,
    },
    {
      name: 'paymentOrderForm',
      maxCount: 1,
    },
    {
      name: 'contractForm',
      maxCount: 1,
    },
    {
      name: 'design',
      maxCount: 1,
    },
    {
      name: 'studyDesign',
      maxCount: 1,
    },
  ]),

  fileuploadController.uploadImage
);

// Expose User Router
module.exports = router;

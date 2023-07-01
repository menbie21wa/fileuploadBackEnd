var express = require('express');
var router = express.Router();

var { upload } = require('../lib/fileUpload');

// var imageController= require('../controller/upload')
var fileuploadController = require('../controller/fileUpload');
var uploadController= require('../controller/upload');

router.post(
  '/uploadfile',
  upload.fields([

    {
      name: 'fileName',
      maxCount: 1,
    }
  ]),

  fileuploadController.uploadImage
);
//  router.get('/all', imageController.uploadFiles);

// ROUTES
router.post("/upload", upload.single("file"), uploadController.uploadFiles);

// Expose User Router
module.exports = router;

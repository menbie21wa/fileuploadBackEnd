
const express = require("express");
const router = express.Router();

// var authenticate        = require('../lib/authenticate');
// var authorization       = require('../lib/authorization');
// var { upload } = require("../lib/fileUpload");

var specificationController = require("../controller/product_specification");

router.post(
    "/create",
    //upload.any(
    //   [
    //   {
    //     name: "profilePic",
    //     maxCount: 2
    //   },
    //   {
    //     name: "file",
    //     maxCount: 2
    //   }
    // ]
    //),
  
    specificationController.createProduct_Specification
  );

  router.get("/all", specificationController.fetchAll);
  router.get("/:id", specificationController.fetchOne);
  router.delete("/:id", specificationController.remove);
  router.put(
    '/:id',
    // authenticate,
    // authorization(['super_admin', 'admin', 'user', 'customer']),
  
    specificationController.update
  );
// Expose User Router
module.exports = router;
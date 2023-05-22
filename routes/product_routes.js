
const express = require("express");
const router = express.Router();

// var authenticate        = require('../lib/authenticate');
// var authorization       = require('../lib/authorization');
// var { upload } = require("../lib/fileUpload");

var productController = require("../controller/product");

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
  
    productController.createProduct
  );

  router.get("/all", productController.fetchAll);
  router.get("/:id", productController.fetchOne);
  router.delete("/:id", productController.remove);
  router.put(
    '/:id',
    // authenticate,
    // authorization(['super_admin', 'admin', 'user', 'customer']),
  
    productController.update
  );
// Expose User Router
module.exports = router;
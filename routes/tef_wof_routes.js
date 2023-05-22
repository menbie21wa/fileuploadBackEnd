
const express = require("express");
const router = express.Router();

// var authenticate        = require('../lib/authenticate');
// var authorization       = require('../lib/authorization');
// var { upload } = require("../lib/fileUpload");

var tefController = require("../controller/tef_wof");

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
  
    tefController.createTef_Wof
  );

  router.get("/all", tefController.fetchAll);
  router.get("/:id", tefController.fetchOne);
  router.delete("/:id", tefController.remove);
  router.put(
    '/:id',
    // authenticate,
    // authorization(['super_admin', 'admin', 'user', 'customer']),
  
    tefController.update
  );
// Expose User Router
module.exports = router;
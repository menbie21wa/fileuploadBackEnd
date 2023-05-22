
const express = require("express");
const router = express.Router();

// var authenticate        = require('../lib/authenticate');
// var authorization       = require('../lib/authorization');
// var { upload } = require("../lib/fileUpload");

var hasabController = require("../controller/hasab");

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

  hasabController.createHasab
);
// console.log("user12 routes page");
// router.post(
//   "/createadmin",
//   authenticate,
//   authorization(["admin"]),
//   upload.fields([
//     {
//       name: "profilePic",
//     },
//     {
//       name: "file",
//     },
//   ]),
//   userController.createAdminUser
// );

router.get("/all", hasabController.fetchAll);

// router.get("/paginate", userController.fetchAllByPagination);

// router.get("/search", userController.search);

router.get("/:id", hasabController.fetchOne);

// router.post("/login", userController.userLogin);

// router.post("/forgotpassword", userController.ForgotPassword);

router.put(
  '/:id',
  // authenticate,
  // authorization(['super_admin', 'admin', 'user', 'customer']),

  hasabController.update
);

router.delete("/:id", hasabController.remove);

// Expose User Router
module.exports = router;
const express = require('express');
const router = express.Router();

var authenticate = require('../lib/authenticate');
var authorization = require('../lib/authorization');
// var { upload } = require("../lib/fileUpload");

var userController = require('../controller/user');

router.post('/create', userController.createUser);

router.get('/all', userController.fetchAll);

// router.get("/paginate", userController.fetchAllByPagination);

router.get('/search', userController.search);

router.get('/:id', userController.fetchOne);

router.post('/login', userController.userLogin);

// router.post("/forgotpassword", userController.ForgotPassword);

router.put(
  '/:id',
  authenticate,
  authorization(['super_admin', 'admin', 'user', 'customer']),
  // upload.fields([
  //   {
  //     name: "profilePic",
  //   },
  //   {
  //     name: "file",
  //   },
  // ]),
  userController.update
);

router.delete('/:id', userController.remove);

// Expose User Router
module.exports = router;


const express = require("express");
const router = express.Router();

var CategoryController = require("../controller/category");

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
  
    CategoryController.createCategory
  );

  router.get("/all", CategoryController.fetchAll);
  router.get('/search', CategoryController.search);
  router.get("/:id", CategoryController.fetchOne);
//   router.delete("/:id", specificationController.remove);
//   router.put(
//     '/:id',
    // authenticate,
    // authorization(['super_admin', 'admin', 'user', 'customer']),
  
   // specificationController.update
  //);
// Expose User Router
module.exports = router;
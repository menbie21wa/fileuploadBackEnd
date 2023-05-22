var EventEmitter = require("events").EventEmitter;
// const bcrypt = require("bcrypt");
const moment = require("moment");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();
const specificationDal = require("../dal/product_specification");

//create start
exports.createProduct_Specification = (req, res, next) => {
  var workflow = new EventEmitter();

  var specificationData = JSON.parse(JSON.stringify(req.body));

  workflow.on('validateData', (specificationData) => {
    if (!specificationData.model || specificationData.model === '') {
      return res.status(400).json({ message: 'እባክዎ የዕቃውን ሞዴል ያስገቡ' });
    }

    //workflow.emit('checkPlanExist', planData);
    workflow.emit('createSpecification', specificationData);
  });

  workflow.on('createSpecification', (specificationData) => {
    specificationDal.create(specificationData, (err, specification) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', specification);
    });
  });

  workflow.on('respond', (specification) => {
    res.status(200).json(specification);
  });

  workflow.emit('validateData', specificationData);
};
  //create end 


    //fetchall start
    exports.fetchAll = (req, res, next) => {
      let workflow = new EventEmitter();
    
      let searchKey = {};
      if (req?.query?.key) {
        searchKey = req.query.key.toLowerCase();
      } else {
        searchKey = undefined;
      }
    
      workflow.on("fetchAllSpecification", () => {
  
        specificationDal.getCollection(searchKey, (err, specification) => {
          if (err) {
            res.status(500).json({
              message: err.message,
            });
            return;
          }
          if (specification && specification.length > 0) {
            workflow.emit("respond", specification);
          } else {
            res.status(400).json({
              message: "Products specification not found",
            });
            return;
          }
        });
      });
    
      workflow.on("respond", (specification) => {
        // users?.map(_user=>{
        //  delete _user?.dataValues.password
        // })
        res.status(200).json(specification);
      });
    
      workflow.emit("fetchAllSpecification");
    };
    //fetchall end

 //fetchbyId start 
 exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req.params;
 
   workflow.on("fetchSpecification", () => {
     specificationDal.getByPk(id, (err, specification) => {
       if (err) {
         res.status(500).json({
           message:"ሰርቨሩ እየሰራ አይደለም"
         });
         return;
       }
       if (specification && Object.keys(specification).length > 0) {
         workflow.emit("respond", specification);
       } else {
         res.status(400).json({
           message: "ባስገቡት መረጃ የተመዘገበ product specification የለም",
         });
         return;
       }
     });
   });
 
   workflow.on("respond", (specification) => {
     delete specification.password;
     res.json(specification);
   });
 
   workflow.emit("fetchSpecification");
 };
  //fetchbyId  end 

  //deletebyId start
  exports.remove = (req, res, next) => {
    // console.log("Archiving user:" + req.params.id);
  
    var workflow = new EventEmitter();
  
    workflow.on("findSpecification", () => {
      specificationDal.getByPk(req.params.id, (err, specification) => {
        if (err) {
          res.satus(500).json({
            name: "SERVER_ERROR",
            message: err.message,
          });
          return;
        }
        if (!specification) {
          res.status(400).json({
            name: "DELETE_Product_Specification_ERROR",
            message: "product specification Data Not Found",
          });
          return;
        }
  
        workflow.emit("deleteProduct", specification);
      });
    });
  
    workflow.on("deleteProduct", (specification) => {
        specificationDal.delete(specification.id, (err, deleteProduct) => {
        if (err) {
          res.status(500).json({
            name: "DELETE_Product_ERROR",
            message: err.message,
          });
          return;
        }
  
        if (deleteProduct || Object.keys(deleteProduct).length > 0) {

          workflow.emit("respond", deleteProduct);

        } else {
          res.status(400).json({ message: "product specification Data not found" });
          return;
        }
      });
    });
  
    workflow.on("respond", (specification) => {
      res
        .status(200)
        .json({ message: `product with id ${specification.id} deleted successfully.` });
      return;
    });
  
    workflow.emit("findSpecification");
  };
  //deletebyId end

    //update start
    exports.update = (req, res, next) => {
      var workflow = new EventEmitter();
      let { id } = req.params;
    
      workflow.on('checkProductSpeExist', (updatePayload) => {
        let specificationQuery = {
          where: {
            id: id,
          },
        };
        specificationDal.get(specificationQuery, (err, specification) => {
          if (err) {
            return res.status(500).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          if (!specification || specification === null || specification === undefined) {
            return res.status(400).json({
              message: 'በዚህ መለያ የተመዘገበ የለም',
            });
          }
    
          workflow.emit('updateSpecification', updatePayload);
        });
      });
    
      workflow.on('updateSpecification', (updatePayload) => {
        let specificationQuery = {
          where: {
            id: id,
          },
        };
        specificationDal.update(updatePayload, specificationQuery, (err, specification) => {
          if (err) {
            return res.status(500).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          if (!specification || specification.length < 0) {
            return res.status(400).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
    
          workflow.emit('getUpdatedData', specification);
        });
      });
    
      workflow.on('getUpdatedData', (specification) => {
        specificationDal.getByPk(id, (err, specificationUpdated) => {
          if (err) {
            return res.status(400).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          workflow.emit('respond', specificationUpdated);
        });
      });
    
      workflow.on('respond', (specificationUpdated) => {
        res.status(200).json(specificationUpdated);
      });
    
      let updatePayload = req.body;
    
      if (Object.keys(updatePayload).length === 0) {
        return res.status(400).json({
          message: 'ምንም ዳታ አላስገቡም',
        });
      }
      workflow.emit('checkProductSpeExist', updatePayload);
    };
    //update end
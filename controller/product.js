var EventEmitter = require("events").EventEmitter;
// const bcrypt = require("bcrypt");
const moment = require("moment");
const fs = require("fs");
const dotenv = require("dotenv");
const { product, product_specification } = require('../models')
dotenv.config();
const productDal = require("../dal/product");

//create start
exports.createProduct = (req, res, next) => {
  var workflow = new EventEmitter();

  var productData = JSON.parse(JSON.stringify(req.body));

  workflow.on('validateData', (productData) => {
    if (!productData.name || productData.name === '') {
      return res.status(400).json({ message: 'እባክዎ የዕቃውን ሞዴል ያስገቡ' });
    }

    //workflow.emit('checkPlanExist', planData);
    workflow.emit('createSpecification', productData);
  });

  workflow.on('createSpecification', (productData) => {
    productDal.create(productData, (err, product) => {
      if (err) {
        return res.status(500).json({
          message: 'ሰርቨሩ እየሰራ አይደለም',
        });
      }
      workflow.emit('respond', product);
    });
  });

  workflow.on('respond', (product) => {
    res.status(200).json(product);
  });

  workflow.emit('validateData', productData);
};
  //create end 

    //fetchall start
    exports.fetchAll = (req, res, next) => {
      let workflow = new EventEmitter();
    
      workflow.on('fetchAllProducts', () => {
        productDal.getCollection({}, (err, product) => {
          if (err) {
            return res.status(500).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          if (product && product.length > 0) {
            workflow.emit('respond', product);
          } else {
            return res.status(400).json({
              message: 'በዚህ መለያ የተመዘገበ product የለም',
            });
          }
        });
      });
    
      workflow.on('respond', (product) => {
        // delete user.password;
        res.status(200).json(product);
      });
    
      workflow.emit('fetchAllProducts');
    };
    //fetchall end

 //fetchbyId start 
 exports.fetchOne = (req, res, next) => {
  let workflow = new EventEmitter();
  let { id } = req.params;
 
   workflow.on("fetchProduct", () => {
     productDal.getByPk(id, (err, product) => {
       if (err) {
         res.status(500).json({
           message:"ሰርቨሩ እየሰራ አይደለም"
         });
         return;
       }
       if (product && Object.keys(product).length > 0) {
         workflow.emit("respond", product);
       } else {
         res.status(400).json({
           message: "ባስገቡት መረጃ የተመዘገበ product የለም",
         });
         return;
       }
     });
   });
 
   workflow.on("respond", (product) => {
     delete product.password;
     res.json(product);
   });
 
   workflow.emit("fetchProduct");
 };
  //fetchbyId  end 

  //deletebyId start
  exports.remove = (req, res, next) => {
    // console.log("Archiving user:" + req.params.id);
  
    var workflow = new EventEmitter();
  
    workflow.on("findProduct", () => {
      productDal.getByPk(req.params.id, (err, product) => {
        if (err) {
          res.satus(500).json({
            name: "SERVER_ERROR",
            message: err.message,
          });
          return;
        }
        if (!product) {
          res.status(400).json({
            name: "DELETE_Product_ERROR",
            message: "product Data Not Found",
          });
          return;
        }
  
        workflow.emit("deleteProduct", product);
      });
    });
  
    workflow.on("deleteProduct", (product) => {
        productDal.delete(product.id, (err, deleteProduct) => {
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
          res.status(400).json({ message: "product Data not found" });
          return;
        }
      });
    });
  
    workflow.on("respond", (product) => {
      res
        .status(200)
        .json({ message: `product with id ${product.id} deleted successfully.` });
      return;
    });
  
    workflow.emit("findProduct");
  };
  //deletebyId end

    //update start
    exports.update = (req, res, next) => {
      var workflow = new EventEmitter();
      let { id } = req.params;
    
      workflow.on('checkProductExist', (updatePayload) => {
        let productQuery = {
          where: {
            id: id,
          },
        };
        productDal.get(productQuery, (err, product) => {
          if (err) {
            return res.status(500).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          if (!product || product === null || product === undefined) {
            return res.status(400).json({
              message: 'በዚህ መለያ የተመዘገበ የለም',
            });
          }
    
          workflow.emit('updateProduct', updatePayload);
        });
      });
    
      workflow.on('updateProduct', (updatePayload) => {
        let productQuery = {
          where: {
            id: id,
          },
        };
        productDal.update(updatePayload, productQuery, (err, product) => {
          if (err) {
            return res.status(500).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          if (!product || product.length < 0) {
            return res.status(400).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
    
          workflow.emit('getUpdatedData', product);
        });
      });
    
      workflow.on('getUpdatedData', (tef_wof) => {
        productDal.getByPk(id, (err, productUpdated) => {
          if (err) {
            return res.status(400).json({
              message: 'ሰርቨሩ እየሰራ አይደለም',
            });
          }
          workflow.emit('respond', productUpdated);
        });
      });
    
      workflow.on('respond', (productUpdated) => {
        res.status(200).json(productUpdated);
      });
    
      let updatePayload = req.body;
    
      if (Object.keys(updatePayload).length === 0) {
        return res.status(400).json({
          message: 'ምንም ዳታ አላስገቡም',
        });
      }
      workflow.emit('checkProductExist', updatePayload);
    };
    //update end
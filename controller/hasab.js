var EventEmitter = require("events").EventEmitter;
// const bcrypt = require("bcrypt");
const moment = require("moment");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

// const jwt = require("jsonwebtoken");
const hasabDal = require("../dal/hasab");
// const EmailDal = require("../dal/email");
// const OtpDal = require("../dal/otp");
// const Forgot_password_email = require("../lib/forgot_password_email");

//create start
exports.createHasab = (req, res, next) => {
  
    console.log("Creating User hasab");
  
    var workflow = new EventEmitter();
  
    var hasabData =JSON.parse(JSON.stringify(req.body));
    //console.log("ተፍ",tefData)
  
    workflow.on("validateHasabData", (hasabData) => {
      if (!hasabData.idea || hasabData.idea === "") {
        res.status(400).json({
          message: "ሀሳብዎን መግለጽ አለብዎት",
        });
        return;
      }

      if (!hasabData.criticalEvent || hasabData.criticalEvent === "") {
        res.status(400).json({
          message: "እሴት ማስገባት አለብዎት",
        });
        return;
      }

      if (!hasabData.userId || hasabData.userId === "") {
        res.status(400).json({
          message: "የተጠቃሚው መለያ ማስገባት አለብዎት",
        });
        return;
      }

    //   if (!userData.sex && userData.sex === "") {
    //     res.status(400).json({
    //       message: "የይለፍ ቃል",
    //     });
    //     return;
    //   }
     
    //   if (imagePayload?.profilePic && imagePayload?.profilePic !== "") {
    //     userData.profilePic = imagePayload?.profilePic[0]?.filename;
    //   }
    //   if (imagePayload?.file && imagePayload?.file !== "") {
    //     userData.file = imagePayload?.file[0]?.filename;
    //   }
     // console.log("userData", userData);
  
      workflow.emit("checkUserExist", hasabData);
    });
  
    workflow.on("checkUserExist", (hasabData) => {
      //console.log("userData",userData)
      let hasabQuery = {
        where: {
            userId: hasabData.userId,
        },
      };
      hasabDal.get(hasabQuery, (err, hasab) => {
        // console.log("server error")
        console.log("err",err)
        if (err) {
         return  res.status(500).json({
            message:"ሰርቨሩ እየሰራ አይደለም one"
          });
        
        }
        if(!hasab || hasab ===""){
          
          workflow.emit('createHasab',hasabData)
        }else{
          return res.status(400).json({message:"የራስዎን ተስፋ ዕምነትና ፍቅር ከዚህ በፊት ሞልተዋል ለማሻሻልም ከሆነ ኢዲት ያድርጉ "})
        }

      });
    });

    workflow.on("createHasab", (hasabData) => {
  
      hasabDal.create(hasabData, (err, hasab) => {
        console.log("hasabData ddd", hasabData);
        if (err) {
          res.status(500).json({
            message:"ሰርቨሩ እየሰራ አይደለም two"
          });
          return;
        }
  
        workflow.emit("respond", hasab);
      });
    });
  
    workflow.on("respond", (hasab) => {
     console.log("created hasab")
      res.status(201).json({
        hasab: hasab,
        message: "በትክክል ተመዝግበዋል"
      });
      return;
    });
  
    // let imagePayload = req.files;
  
    workflow.emit("validateHasabData", hasabData);
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
      
        workflow.on("fetchAllHasab", () => {
    
          hasabDal.getCollection(searchKey, (err, hasab) => {
            if (err) {
              res.status(500).json({
                message: err.message,
              });
              return;
            }
            if (hasab && hasab.length > 0) {
              workflow.emit("respond", hasab);
            } else {
              res.status(400).json({
                message: "hasab not found",
              });
              return;
            }
          });
        });
      
        workflow.on("respond", (hasab) => {
          // users?.map(_user=>{
          //  delete _user?.dataValues.password
          // })
          res.status(200).json(hasab);
        });
      
        workflow.emit("fetchAllHasab");
      };
//fetchall end

 //fetchbyId start 
 exports.fetchOne = (req, res, next) => {
    let workflow = new EventEmitter();
    let { id } = req.params;
   
     workflow.on("fetchHasab", () => {
       hasabDal.getByPk(id, (err, hasab) => {
         if (err) {
           res.status(500).json({
             message:"ሰርቨሩ እየሰራ አይደለም"
           });
           return;
         }
         if (hasab && Object.keys(hasab).length > 0) {
           workflow.emit("respond", hasab);
         } else {
           res.status(400).json({
             message: "ባስገቡት መረጃ የተመዘገበ ተስፋ ዕምነትና ፍቅር የለም",
           });
           return;
         }
       });
     });
   
     workflow.on("respond", (hasab) => {
    //    delete hasab.password;
       res.json(hasab);
     });
   
     workflow.emit("fetchHasab");
   };
    //fetchbyId  end 

  //deletebyId start
  exports.remove = (req, res, next) => {
    // console.log("Archiving user:" + req.params.id);
  
    var workflow = new EventEmitter();
  
    workflow.on("findHasab", () => {
      hasabDal.getByPk(req.params.id, (err, hasab) => {
        if (err) {
          res.satus(500).json({
            name: "SERVER_ERROR",
            message: err.message,
          });
          return;
        }
        if (!hasab) {
          res.status(400).json({
            name: "DELETE_Hasab_ERROR",
            message: "Hasab Data Not Found",
          });
          return;
        }
  
        workflow.emit("deleteHasab", hasab);
      });
    });
  
    workflow.on("deleteHasab", (hasab) => {
        hasabDal.delete(hasab.id, (err, deletehasab) => {
        if (err) {
          res.status(500).json({
            name: "DELETE_Tef_Wof_ERROR",
            message: err.message,
          });
          return;
        }
  
        if (deletehasab || Object.keys(deletehasab).length > 0) {

          workflow.emit("respond", deletehasab);

        } else {
          res.status(400).json({ message: "hasab Data not found" });
          return;
        }
      });
    });
  
    workflow.on("respond", (hasab) => {
      res
        .status(200)
        .json({ message: `hasab with id ${hasab.id} deleted successfully.` });
      return;
    });
  
    workflow.emit("findHasab");
  };
  //deletebyId end

  //update start
  exports.update = (req, res, next) => {
    var workflow = new EventEmitter();
    let { id } = req.params;
  
    workflow.on('checkHasabExist', (updatePayload) => {
      let hasabQuery = {
        where: {
          id: id,
        },
      };
      hasabDal.get(hasabQuery, (err, hasab) => {
        if (err) {
          return res.status(500).json({
            message: 'ሰርቨሩ እየሰራ አይደለም',
          });
        }
        if (!hasab || hasab === null || hasab === undefined) {
          return res.status(400).json({
            message: 'በዚህ መለያ የተመዘገበ የለም',
          });
        }
  
        workflow.emit('updateHasab', updatePayload);
      });
    });
  
    workflow.on('updateHasab', (updatePayload) => {
      let hasabQuery = {
        where: {
          id: id,
        },
      };
      hasabDal.update(updatePayload, hasabQuery, (err, hasab) => {
        if (err) {
          return res.status(500).json({
            message: 'ሰርቨሩ እየሰራ አይደለም',
          });
        }
        if (!hasab || hasab.length < 0) {
          return res.status(400).json({
            message: 'ሰርቨሩ እየሰራ አይደለም',
          });
        }
  
        workflow.emit('getUpdatedData', hasab);
      });
    });
  
    workflow.on('getUpdatedData', (hasab) => {
      hasabDal.getByPk(id, (err, hasabUpdated) => {
        if (err) {
          return res.status(400).json({
            message: 'ሰርቨሩ እየሰራ አይደለም',
          });
        }
        workflow.emit('respond', hasabUpdated);
      });
    });
  
    workflow.on('respond', (hasabUpdated) => {
      res.status(200).json(hasabUpdated);
    });
  
    let updatePayload = req.body;
  
    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({
        message: 'ምንም ዳታ አላስገቡም',
      });
    }
    workflow.emit('checkHasabExist', updatePayload);
  };
  //update end
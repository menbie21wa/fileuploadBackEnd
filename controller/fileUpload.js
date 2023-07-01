const EventEmitter = require('events').EventEmitter;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.uploadImage = (req, res, next) => {
  var workflow = new EventEmitter();
  let fileData = req.files;
  // console.log("file type",fileData.mimetype.split('/')[0])
  workflow.on('validateData', () => {
    if (!fileData) {
      return res.status(400).json({
        message: 'እባክዎ ፋይልዎን ያስገቡ',
      });
    } 
    else {
   
      if (fileData && fileData.fileName && fileData.fileName[0].fieldname !== '') {
        fileData.fileName = fileData.fileName[0].filename;
      }
      workflow.emit('respond', fileData);
    }
  });

  workflow.on('respond', (fileData) => {
    res.status(200).json(fileData);
  });

  workflow.emit('validateData');
};

// exports.fetchAll = (req, res, next) => {
//   let workflow = new EventEmitter();

//   workflow.on('fetchAllFiles', () => {
//     fileDal.getCollection({}, (err, file) => {
//       if (err) {
//         return res.status(500).json({
//           message: 'ሰርቨሩ እየሰራ አይደለም',
//         });
//       }
//       if (file && file.length > 0) {
//         workflow.emit('respond', file);
//       } else {
//         return res.status(400).json({
//           message: 'file not found'
//         });
//       }
//     });
//   });

//   workflow.on('respond', (files) => {
//     res.status(200).json(files);
//   });

//   workflow.emit('fetchAllFiles');
// };
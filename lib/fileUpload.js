const multer = require('multer');
const moment = require('moment');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   // console.log("file type",file.mimetype.split('/')[0])
    var ext = path.extname(file.originalname);
    if (
      (ext && ext === '.jpeg') ||
      ext === '.jpg' ||
      ext === '.png' ||
      ext === '.gif'
    ) {
      cb(null, 'images');
    } else if (
      ext === '.pdf'||
      ext === '.ppt'||  
      ext === '.doc'||
      ext === '.zip'||     
      ext === '.txt'
    ) {
      cb(null, 'files');
    } else if (ext === '.mp3') {
      cb(null, 'audios');
    } else if (ext === '.mp4') {
      cb(null, 'videos');
    } else {
      return cb(
        new Error(
          'ያልተፈቀደ ፍይል ፎርማት አስገብተዋል  የተፈከዱ (.png,.jpeg,.jpg,.gif,.mp3,.mp4,.pdf) ብቻ ናቸው'
        )
      );
    }
  },

  filename: (req, file, cb) => {
    cb(null,moment().unix() + '-' + file.originalname);
  },
});



//fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
const fileFilter =(req, file, cb) => {
  //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size'))
  }
  //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
  cb(undefined, true)
}

exports.upload = multer({
  storage: storage,
});

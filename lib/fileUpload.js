const multer = require('multer');
const moment = require('moment');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var ext = path.extname(file.originalname);
    if (
      (ext && ext === '.jpeg') ||
      ext === '.jpg' ||
      ext === '.png' ||
      ext === '.gif'
    ) {
      cb(null, 'images');
    } else if (ext === '.pdf') {
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
    cb(null, moment().unix() + '-' + file.originalname);
  },
});
exports.upload = multer({
  storage: storage,
});

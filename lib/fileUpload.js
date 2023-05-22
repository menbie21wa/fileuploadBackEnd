const multer = require('multer');
const moment = require('moment');

const filterFile = (req, res, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    fiel.mimetype === 'image/gif' ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/mp4' ||
    file.mimetype === 'application/mp3'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/gif'
    ) {
      cb(null, 'images');
    } else if (file.mimetype === 'application/pdf') {
      cb(null, 'files');
    } else if (file.mimetype === 'application/mp3') {
      cb(null, 'audios');
    } else if (file.mimetype === 'application/mp4') {
      cb(null, 'videos');
    } else {
      cb(null, false);
    }
  },

  filename: (req, file, cb) => {
    cb(null, moment().unix() + '-' + file.originalname);
  },
});
exports.upload = multer({
  storage: storage,
  filterFile: filterFile,
});

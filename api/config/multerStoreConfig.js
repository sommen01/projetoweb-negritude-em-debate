const multer = require('multer');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (request, file, cb) => {
    cb(null, `photo-${ Date.now() }.${ mime.extension(file.mimetype) }`);
  }
});

module.exports = storage;
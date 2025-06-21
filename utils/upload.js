const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
  destination:  'src/assets/images', // update path as needed
  filename: function (req, image, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(image.originalname));
  }
});

// File filter for images only
const fileFilter = function (req, file, cb) {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

// Create upload instance
const upload = multer({ storage, fileFilter });

module.exports = upload;

const multer = require("multer");

const getMulterStorage = () => {
  var multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `uploads/${file.mimetype.split("/")[0]}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.${ext}`);
    },
  });
  return multerStorage;
};

const getMulterFilter = (fileType) => {
  var MulterFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] == fileType) {
      cb(null, true);
    }
  };
  return MulterFilter;
};

const getUpload = () => {
  var upload = multer({
    storage: getMulterStorage(),
  });
  return upload;
};

exports.upload = () => getUpload();

exports.setFilenames = (req, res, next) => {
  function setBody(file) {
    req.body[file.fieldname] = file.filename;
  }
  if (req.file) {
    setBody(req, req.file);
  } else if (req.files) {
    for (var field in req.files) {
      setBody(req.files[field][0]);
    }
  }

  next();
};

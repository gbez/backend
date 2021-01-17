const multer = require("multer");

const getMulterStorage = (model) => {
  var multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${file.mimetype.split("/")[0]}/${model}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mime;
      type.split("/")[1];
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

const getUpload = (model) => {
  var upload = multer({
    storage: getMulterStorage(model),
  });
  return upload;
};

exports.upload = (model) => getUpload(model);

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

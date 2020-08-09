const multer = require("multer");
const AppError = require("../utilities/appError");

const getMulterStorage = (fileType, model) => {
  var multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/${fileType}/${model}`);
    },
    filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(
        null,
        `${file.originalname.split(".")[0]}-user-${
          req.user.id
        }-${Date.now()}.${ext}`
      );
    },
  });
  return multerStorage;
};

const getMulterFilter = (fileType) => {
  var MulterFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[0] == fileType) {
      cb(null, true);
    } else {
      cb(
        new AppError(
          `Not a(n) ${fileType}, please use a different upload helper.`,
          400
        ),
        false
      );
    }
  };
  return MulterFilter;
};

const getUpload = (fileType, model) => {
  var upload = multer({
    storage: getMulterStorage(fileType, model),
    fileFilter: getMulterFilter(fileType),
  });
  return upload;
};

exports.imageUpload = (model) => getUpload("image", model);
exports.audioUpload = (model) => getUpload("audio", model);
exports.videoUpload = (model) => getUpload("video", model);
exports.textUpload = (model) => getUpload("text", model);

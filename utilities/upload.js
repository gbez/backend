const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/${file.mimetype.split("/")[0]}`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.${ext}`);
  },
});

//FILTERS
const imageFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const textFilter = (req, file, cb) => {
  console.log(file.mimetype);
  if (file.mimetype == "text/plain") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

exports.file = multer({ storage: storage });
exports.text = multer({ storage: storage, fileFilter: textFilter });

exports.sendFile = (req, res, next) => {
  try {
    return res.status(201).json({
      message: "File uploded successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

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

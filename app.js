// Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const multer = require("multer");
const path = require("path");

// Import Routes
const blogRoutes = require("./routes/blogRoutes");
// MIDDLEWARE
// Instantiate Express Instance
const app = express();

// Add Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
// Cybersecurity Middlware
app.use(helmet());

// UPLOADS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/${file.mimetype.split("/")[0]}`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.originalname.split(".")[0]}-${Date.now()}.${ext}`);
  },
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const textFilter = (req, file, cb) => {
  if (file.mimetype == "text/markdown") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const imageUpload = multer({ storage: storage, fileFilter: imageFilter });
const textUpload = multer({ storage: storage, fileFilter: textFilter });
// ROUTING
app.use("/api/v1/blog", blogRoutes);

//Upload route
app.post("/api/v1/upload", imageUpload.single("image"), (req, res, next) => {
  try {
    return res.status(201).json({
      message: "File uploded successfully",
    });
  } catch (error) {
    console.error(error);
  }
});
// Export app to server
module.exports = app;

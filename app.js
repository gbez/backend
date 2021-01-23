// Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");
const AppError = require("./utilities/appError");

// Import Routes
const blogRoutes = require("./routes/blogRoutes");
// MIDDLEWARE
// Instantiate Express Instance
const app = express();

// Add Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
// Cybersecurity Middlware
app.use(helmet());

// UPLOADS

// ROUTING
app.use(express.static("public"));
app.use("/api/v1/blog", blogRoutes);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Export app to server
module.exports = app;

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
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const relationshipRoutes = require("./routes/relationshipRoutes");
const communicationRoutes = require("./routes/communicationRoutes");

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
app.use("/api/v1/blogpost", blogRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/relationship", relationshipRoutes);
app.use("/api/v1/communication", communicationRoutes);

// ERROR HANDLING
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
// Export app to server
module.exports = app;

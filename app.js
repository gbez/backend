// Import modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

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
//comment
// ROUTING
app.use("/api/v1/blog", blogRoutes);

// Export app to server
module.exports = app;

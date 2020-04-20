//Import Modules
const express = require("express");
const fs = require("fs");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const AppError = require("./utilities/appError");
const ErrorHandler = require("./controllers/errorController");
const relationshipRoutes = require("./routes/relationship/relationshipRoutes");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/relationship/groupRoutes");

//Instantiate Express Instance
const app = express();

//Add Middleware
app.use(morgan("dev"));

//Cyber Security Middle Ware
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

app.use(express.json());

// Connect Routes (which is our own Middleware)
app.use("/api/v1/relationships", relationshipRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/groups", groupRoutes);

app.use(ErrorHandler);

//Start Server
module.exports = app;

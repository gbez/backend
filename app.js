//<---------------------------BEGIN IMPORT------------------------------------>

//Import App Modules
const express = require("express");
const morgan = require("morgan");

//Import Cyber Security Modules

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

//Import Routers Modules
const relationshipRoutes = require("./routes/relationship/relationshipRoutes");
const userRoutes = require("./routes/userRoutes");
const groupRoutes = require("./routes/relationship/groupRoutes");
const bookRoutes = require("./routes/journal/bookRoutes");
const quoteRoutes = require("./routes/journal/quoteRoutes");
const timelineEventRoutes = require("./routes/journal/timelineEventRoutes");

//Import Error Handling Modules

const AppError = require("./utilities/appError");
const ErrorHandler = require("./controllers/errorController");

//<----------------------------Mount Middleware------------------------------->

//Instantiate Express Instance
const app = express();

//Add Middleware
app.use(morgan("dev"));
app.use(express.json());

//<--------------------------Cyber Security Middleware------------------------>
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/api", limiter);

//<--------------------------Route Middleware--------------------------------->

// Connect Routes (which is our own Middleware)
app.use("/api/v1/relationships", relationshipRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/groups", groupRoutes);

//Journal Routes
app.use("/api/v1/books", bookRoutes);
app.use("/api/v1/quotes", quoteRoutes);
app.use("/api/v1/timelineEvents", timelineEventRoutes);

//Error if route is missed
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

//<--------------------------Eroror Handling Middware------------------------->

app.use(ErrorHandler);

//Start Server
module.exports = app;

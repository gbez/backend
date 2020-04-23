const AppError = require("../utilities/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  console.log("in duplication handle");
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplication with value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () => {
  return new AppError("Invalid JWT. Please log in again!", 400);
};

const handleJWTExpiredError = () => {
  return new AppError("Your token has expired. Please log in again", 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message;

  if (err.code === 11000) err = handleDuplicateFieldsDB(err);
  if (err.name === "CastError") err = handleCastErrorDB(err);
  if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  console.log("ERROR: ", err);
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

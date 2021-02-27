const User = require("../models/UserModel");
const factory = require("../utilities/handlerFactory");
const helpers = require("../utilities/helpers");

// Custom Middleware
exports.filterUser = (req, res, next) => {
  next();
};
// CRUD Operations
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

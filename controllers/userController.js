const User = require("../models/userModel");
const factory = require("../utilities/handlerFactory");
const helpers = require("../utilities/helpers");

// Custom Middleware
exports.filterUser = (req, res, next) => {
  next();
};

exports.whoAmI = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};
// CRUD Operations
exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.createUser = factory.createOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

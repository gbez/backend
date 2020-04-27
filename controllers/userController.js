const fs = require("fs");
const User = require("./../models/userModel");
const AppError = require("./../utilities/appError");

const filterObj = (object, ...fields) => {
  const newObject = {};
  Object.keys(object).forEach((el) => {
    if (fields.includes(el)) newObject[el] = object[el];
  });
  return newObject;
};

//example of custom middleware
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "No Name or Price",
    });
  }
  next();
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });
    res.status(200).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    console.log(`This is the request body: ${req.body}`);
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
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

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.updateMe = async (req, res, next) => {
  try {
    // 1) Error if user tries to change password
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This is not the route for updating password. Please use /updatePassword",
          400
        )
      );
    }
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "photo"
    );
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: false,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
    // 2) update user document
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err,
    });
  }
};

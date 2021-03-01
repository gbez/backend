const User = require("../models/UserModel");
//const sendEmail = require("../utilities/email");
const AppError = require("../utilities/appError");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

//JWT METHODS
//Create JWT Token and Sign with USER ID
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

// Create response to send with JWT
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
    secure: true,
    httpOnly: true,
  });
  res.statusCode(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// AUTHORIZATION METHODS
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      avatar: req.body.avatar,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or passwor", 401));
  }
  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return new AppError("You are not logged in!", 401);
  }

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const potentialUser = await User.findById(decodedToken.id);
  if (!potentialUser) {
    return next(
      new AppError("The User specified by the JWT does not exist any more", 401)
    );
  }

  req.user = potentialUser;

  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission based on your role!", 403)
      );
    }
    next();
  };
};

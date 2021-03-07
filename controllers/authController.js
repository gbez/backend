const User = require("../models/UserModel");
const email = require("../utilities/email/nodemailer");
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
  res.status(statusCode).json({
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
    console.log(req.body);
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
  console.log("in Protect");
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("no token");
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

exports.forgotPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/user/resetPassword/${resetToken}`;

  const message = {
    from: "grant@grantbesner.com",
    to: "besgr01@nova.edu",
    subject: "Reset Password",
    text: `Submit Path request to: ${resetURL}`,
    html: `<h1>Submit Path request to: ${resetURL}</h1>`,
  };
  try {
    await email.send(message);
    res.status(200).json({ status: "status", message: "Token sent to email!" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the reset password email", 500)
    );
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    console.log(req.params.token);
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      //passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

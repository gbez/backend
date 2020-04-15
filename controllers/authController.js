const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const AppError = require("./../utilities/appError");
const sendEmail = require("./../utilities/email");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
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

exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = signToken(newUser._id);

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
  //The plus is used below because we set select to false for password in model
  //because we didn't want client to be able to see it.
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
};

exports.protect = async (req, res, next) => {
  // 1) Get token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return new AppError(
      "You are not logged in! Please log in to get access",
      401
    );
  }

  // 2) We need to validate the token...verify method -> Verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return newxt(new AppError("The User no longer exists", 401));
  }

  req.user = currentUser;

  // 4) Check if user changed password after the token was issued
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to do this!", 403));
    }
    next();
  };
};

exports.forgotPassword = async (req, res, next) => {
  // 1) Get user based on input email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with that email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  // 3) Send it to user email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit PATCH request to: ${resetURL}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset",
      message: message,
    });
    res
      .status(200)
      .json({ status: "success", message: "Token sent to email!" });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("There was an error sending the email!", 500));
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // 1) We want to get the user and make sure they are valid.
    //    we can retrieve based on the token...

    // 2) We want to take the resetToken and run the same crypto compare on it
    //    to the reset token that is stored in the DB...and that it hasn't expired yet
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError("Token is invalid or has expired", 400));
    }
    // 3) If the token is valid, we want to allow the user
    //    to update their password with a new password
    //    validators run on document itself being patched
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    //we use save because we want to run save middleware (validators)
    await user.save();

    // 6) then log user in after password has been reset: send JWT to client
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.updateMyPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return next(new AppError("The user could not be found", 400));
    }
    // 2) Check if current password is correct
    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return next(new AppError("Please enter valid current password", 400));
    }
    // 3) If correct, then update password
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPasswordConfirm;
    await user.save();
    // 4) Log user in, send JWT back to user
    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
      err: err.stack,
    });
  }
};

const mongoose = require("mongoose");
const validator = require("validator");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is a required field"],
    },
    lastName: String,
    email: {
      type: String,
      unique: true,
      required: [true, "User Email Required"],
      validate: [validator.isEmail, "Please provide valid e-mail"],
    },
    phone: {
      type: Number,
      unique: true,
      required: false,
    },
    role: {
      type: String,
      enum: ["admin", "editor", "user"],
      default: "user",
    },
    avatar: String,
    password: {
      type: String,
      minlength: [8, "Password must be 8 or more characters"],
      required: [true, "Password Required"],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Password Confirm Required"],
      validate: {
        validator: function (val) {
          return val === this.password;
        },
        message: "Password Confirmation must match Password",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

//MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hext");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

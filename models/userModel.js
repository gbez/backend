const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: false,
    require: [true, "First Name Required"],
  },
  lastName: {
    type: String,
    unique: false,
    required: [true, "Last Name Required"],
  },
  email: {
    type: String,
    required: [true, "Email Required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide valid e-mail address"],
  },
  role: {
    type: String,
    enum: ["admin", "editor", "user", "guest"],
    default: "user",
  },
  photo: String,
  password: {
    type: String,
    minlength: [8, "Password must be 8 or more characters"],
    required: [true, "Password Required"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password Confirm Required"],
    //This will only work on create or save!!!
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
});

//Write middleware to encrypt password before save
userSchema.pre("save", async function (next) {
  //Only run function if password was changed
  if (!this.isModified("password")) return next();
  //Hash password with 12 salt (complexity of hash string)
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//Instance method, available on all documents
//Compare input and DB stored passwords using bcrypt algorithm
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
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const moment = require("moment");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model("User", userSchema);
module.exports = User;

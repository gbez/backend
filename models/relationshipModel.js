const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const moment = require("moment");

const relationshipSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required!"],
      validate: [validator.isEmail, "email must be valid"]
    },
    firstName: String,
    lastName: String,
    DoB: Date,
    phone: Number,
    address: String,
    newsletters: [String],
    /* TODO
     * Create sub scheme for group. Each relationship belongs to a group.
     * Each group has a priority number.
     */
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Relationship = mongoose.model("Relationship", relationshipSchema);
module.exports = Relationship;

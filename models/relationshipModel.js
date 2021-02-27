const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const moment = require("moment");

const relationshipSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Relationship = mongoose.model("Relationship", relationshipSchema);
module.exports = Relationship;

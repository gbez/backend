const mongoose = require("mongoose");
const Group = require("./groupModel");

const relationshipSchema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: false,
    require: [true, "First Name Required"]
  },
  lastName: {
    type: String,
    unique: false,
    required: [true, "Last Name Required"]
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email Required"]
  },
  phoneNumber: {
    type: String
  },
  image: {
    type: String
  },
  country: {
    type: Number
  },
  state: {
    type: Number
  },
  city: {
    type: String
  },
  address: {
    type: String
  },
  zip: {
    type: String
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  birthday: {
    type: Date
  },
  dateLastEmail: {
    type: Date
  },
  dateLastCall: {
    type: Date
  },
  dateLastMeeting: {
    type: Date
  },
  groups: {
    type: [Number]
  }
});

const Relationship = mongoose.model("Relationship", relationshipSchema);

module.exports = Relationship;

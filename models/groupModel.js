const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String
  },
  priority: {
    type: Number
  }
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Group name required"],
  },
  groupMembers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Relationship",
    },
  ],
  //Group Settings and Permissions
  //How frequently to contact them
  //Should I reach out on their birthday?
  //To fill out in the future.
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

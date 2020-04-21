const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: [true, "Group name required"],
  },
  //Group Settings and Permissions
  //How frequently to contact them
  //Should I reach out on their birthday?
  //To fill out in the future.
});

groupSchema.pre("deleteOne", function (next) {
  this.model("Relationship").remove({ groups: this._id }, next);
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;

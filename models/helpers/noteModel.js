const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  foreignId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "foreignId Required"],
    refPath: `onModel`,
  },
  onModel: {
    type: String,
    required: [true, "Model Name Required"],
  },
  text: {
    type: String,
    required: [true, "Note content is required"],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;

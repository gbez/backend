const mongoose = require("mongoose");

const Note = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Note content is required"],
  },
  tags: [String],
  categories: [String],
});

const authorSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  books: {
    type: [mongoose.Schema.ObjectId],
    ref: "Book",
  },
  notes: {
    type: [Note],
  },
  born: Date,
  died: Date,
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;

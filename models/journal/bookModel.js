const mongoose = require("mongoose");
const validator = require("validator");

const Note = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Note content is required"],
  },
  tags: [String],
  categories: [String],
});

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title required"],
    },
    subtitle: String,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "Author",
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
    publisher: String,
    publicationDate: Date,
    pageCount: Number,
    synopsis: String,
    reflection: String,
    authorNotes: String,
    isbn: {
      type: Number,
      validate: [validator.isISBN, "Must be Valid ISBN #"],
    },
    notes: {
      type: [Note],
    },
    categories: {
      type: [String],
    },
    tags: {
      type: [String],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

bookSchema.virtual("quotes", {
  ref: "Quote",
  foreignField: "book",
  localField: "_id",
});

bookSchema.virtual("timelineEvents", {
  ref: "TimelineEvent",
  foreignField: "book",
  localField: "_id",
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;

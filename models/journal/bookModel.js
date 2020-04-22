const mongoose = require("mongoose");
const validator = require("validator");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title required"],
    },
    subtitle: String,
    author: {
      type: String,
      required: [true, "Book author required"],
    },
    publicationDate: Date,
    pageCount: Number,
    amazonLink: String,
    synopsis: String,
    reflection: String,
    isbn: {
      type: Number,
      validate: [validator.isISBN, "Must be Valid ISBN #"],
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

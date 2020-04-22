const mongoose = require("mongoose");

const quoteSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.ObjectId,
      ref: "Book",
    },
    author: String,
    text: String,
    date: Date,
    tags: {
      type: [String],
      select: false,
    },
    categories: {
      type: [String],
      select: false,
    },
    onCycle: {
      type: Boolean,
      default: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Quote = mongoose.model("Quote", quoteSchema);

module.exports = Quote;

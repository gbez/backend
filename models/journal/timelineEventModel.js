const mongoose = require("mongoose");

const timelineEventSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, "event Date required"],
  },
  title: {
    type: String,
    required: [true, "event title required"],
  },
  text: String,
  photo: String,
  link: String,
  rating: {
    type: Number,
    min: [1, "Rating min is 1"],
    max: [10, "Rating max is 10"],
  },
  category: [String],
  tag: [String],
  book: {
    type: mongoose.Schema.ObjectId,
    ref: "Book",
  },
});

const TimelineEvent = mongoose.model("TimeLineEvent", timelineEventSchema);

module.exports = TimelineEvent;

const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const moment = require("moment");
const readingTime = require("reading-time");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog Title Required"],
    },
    subtitle: {
      type: String,
    },
    blurb: {
      type: String,
    },
    slug: {
      type: String,
      default: function () {
        return slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g });
      },
    },
    publish_date: {
      type: Date,
      default: Date.now,
    },
    url: {
      type: String,
      default: function () {
        return `/${moment
          .unix(this.publish_date / 1000)
          .format("YYYY")}/${moment
          .unix(this.publish_date / 1000)
          .format("MM")}/${moment
          .unix(this.publish_date / 1000)
          .format("DD")}/${this.slug}`;
      },
    },
    content: {
      type: String,
    },
    category: {
      type: String,
    },
    tag: {
      type: [String],
    },
    thumbnail: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: true,
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

blogSchema.virtual("readableDate").get(function () {
  if (this.publish_date)
    return moment.unix(this.publish_date / 1000).format("MMMM Do, YYYY");
});

blogSchema.virtual("readingTime").get(function () {
  if (this.content) return readingTime(this.content);
});

blogSchema.virtual("status").get(function () {
  if (this.publish_date > Date.now()) {
    return "pending";
  } else {
    return "published";
  }
});
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;

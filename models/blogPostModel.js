const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");
const parse = require("node-html-parser");
const moment = require("moment");
const readingTime = require("reading-time");

function makeSlug(v) {
  return;
}

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title Required"],
    },
    subtitle: {
      type: String,
    },
    description: {
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
        return `/${this.page}/${this.subpage}/${moment
          .unix(this.publish_date / 1000)
          .format("YYYY")}/${moment
          .unix(this.publish_date / 1000)
          .format("MM")}/${this.slug}`;
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

blogPostSchema.virtual("readableDate").get(function () {
  if (this.publish_date)
    return moment.unix(this.publish_date / 1000).format("dddd, MMMM Do, YYYY");
});


blogPostSchema.virtual("status").get(function () {
  if (this.publish_date > Date.now()) {
    return "pending";
  } else {
    return "published";
  }
});

blogPostSchema.pre(/^find/, function (next) {
  this.populate({
    path: "relatedPosts",
  });
  next();
});

blogPostSchema.index({ publish_date: -1 });

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;

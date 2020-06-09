const mongoose = require("mongoose");
const validator = require("validator");
const slugify = require("slugify");

const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post Title Required"],
    },
    subtitle: {
      type: String,
    },
    publish_date: {
      type: Date,
      default: Date.now,
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
    categories: {
      type: [String],
    },
    tags: {
      type: [String],
    },
    views: {
      type: Number,
      default: 0,
    },
    mainSubject: {
      type: String,
    },
    relatedPosts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "BlogPost",
      },
    ],
    accessibleTo: {
      type: [String],
      default: "all",
    },
  },
  { id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

blogPostSchema.virtual("slug").get(function () {
  return slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g });
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

module.exports = BlogPost;

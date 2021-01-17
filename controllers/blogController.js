const Blog = require("../models/blogModel");
const factory = require("../utilities/handlerFactory");
const helpers = require("../helpers");
//const { upload } = require("../utilities/uploadHelper");

// File Middleware

// Custom Middleware
exports.filterBlog = (req, res, next) => {
  if (req.params.field) {
    req.query[req.params.field] = req.params.name;
    req.query.page = req.params.page;
  }
  if (req.params.slug) {
    req.query.slug = req.params.slug;
  }
  next();
};
// CRUD Operations
exports.getAllBlogs = factory.getAll(Blog, 0, ["category", "tag"]);
exports.getBlog = factory.getOne(Blog);
exports.createBlog = factory.createOne(Blog);
exports.updateBlog = factory.updateOne(Blog);
exports.deleteBlog = factory.deleteOne(Blog);

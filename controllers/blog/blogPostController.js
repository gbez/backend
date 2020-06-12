const BlogPost = require("../../models/blog/blogPostModel");
const factory = require("../../utilities/handlerFactory");

//Custom Middleware
exports.queryBuilder = (req, res, next) => {
  next();
};

//Factory CRUD Operations
exports.createBlogPost = factory.createOne(BlogPost);

exports.getAllBlogPosts = factory.getAll(BlogPost, ["categories"]);

exports.getBlogPost = factory.getOne(BlogPost);

exports.updateBlogPost = factory.updateOne(BlogPost);

exports.deleteBlogPost = factory.deleteOne(BlogPost);

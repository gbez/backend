const BlogPost = require("../../models/blog/blogPostModel");
const factory = require("../../utilities/handlerFactory");

//Custom Middleware

//Factory CRUD Operations
exports.createBlogPost = factory.createOne(BlogPost);

exports.getAllBlogPosts = factory.getAll(BlogPost);

exports.getBlogPost = factory.getOne(BlogPost);

exports.updateBlogPost = factory.updateOne(BlogPost);

exports.deleteBlogPost = factory.deleteOne(BlogPost);

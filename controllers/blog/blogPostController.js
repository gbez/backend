const BlogPost = require("../../models/blog/blogPostModel");
const factory = require("../../utilities/handlerFactory");

//Custom Middleware

function dateHelper(year, month) {
  var start = new Date(year);
  var end = new Date(String(parseInt(year) + 1));
  if (month) {
    var month = parseInt(month) - 1;
    start = new Date(year, month);
    end = new Date(year, String(parseInt(month) + 1));
  }
  var dateQuery = { $gt: start, $lt: end };
  console.log(dateQuery);
  return dateQuery;
}

exports.aliasBuilder = (req, res, next) => {
  if (req.params.alias) {
    req.query.categories = req.params.alias;
  }
  if (req.params.subalias) {
    req.query.tags = req.params.subalias;
  }
  if (req.params.year || req.params.month) {
    req.query.publish_date = dateHelper(req.params.year, req.params.month);
  }
  if (req.params.slug) {
    req.query.slug = req.params.slug;
  }
  next();
};

//Factory CRUD Operations
exports.createBlogPost = factory.createOne(BlogPost);

exports.getAllBlogPosts = factory.getAll(
  BlogPost,
  { path: "author relatedPosts" },
  ["categories", "tags"]
);

exports.getBlogPost = factory.getOne(BlogPost, { path: "author relatedPosts" });

exports.updateBlogPost = factory.updateOne(BlogPost);

exports.deleteBlogPost = factory.deleteOne(BlogPost);

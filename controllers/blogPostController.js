const BlogPost = require("../../models/blog/blogPostModel");
const factory = require("../utilities/handlerFactory");
const { upload } = require("../utilities/uploadHelper");

//-----------------------------File Middleware-------------------------------->

const blogpostUpload = upload("blogposts");
exports.uploadFiles = blogpostUpload.fields([
  { name: "desktopThumbnail", maxCount: 1 },
  { name: "mobileThumbnail", maxCount: 1 },
  { name: "content", maxCount: 1 },
]);

//---------------------------Custom Middleware-------------------------------->

function dateHelper(year, month) {
  var start = new Date(year);
  var end = new Date(String(parseInt(year) + 1));
  if (month) {
    //Because it is zero indexed for some reason i.e. Jan. = 0. Dec. = 11...etc.
    var month = parseInt(month) - 1;
    start = new Date(year, month);
    end = new Date(year, String(parseInt(month) + 1));
  }
  var dateQuery = { $gt: start, $lt: end };
  console.log(dateQuery);
  return dateQuery;
}

exports.aliasBuilder = (req, res, next) => {
  if (req.params.page) {
    req.query.page = req.params.page;
  }
  if (req.params.subpage) {
    req.query.subpage = req.params.subpage;
  }
  if (req.params.year || req.params.month) {
    req.query.publish_date = dateHelper(req.params.year, req.params.month);
  }
  if (req.params.slug) {
    req.query.slug = req.params.slug;
  }
  next();
};

//------------------------Factory CRUD Operations----------------------------->

exports.createBlogPost = factory.createOne(BlogPost);

exports.getAllBlogPosts = factory.getAll(
  BlogPost,
  ["categort", "tag"]
);

exports.getBlogPost = factory.getOne(BlogPost, { path: "author relatedPosts" });

exports.updateBlogPost = factory.updateOne(BlogPost);

exports.deleteBlogPost = factory.deleteOne(BlogPost);

const BlogPost = require("../../models/blog/blogPostModel");
const factory = require("../../utilities/handlerFactory");
const {
  imageUpload,
  textUpload,
  videoUpload,
  audioUpload,
} = require("../../utilities/uploadHelper");

//Custom Middleware

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

const blogpostImageUpload = imageUpload("blogposts");
const blogpostTextUpload = textUpload("blogposts");
const blogpostAudioUpload = audioUpload("blogposts");
const blogpostVideoUpload = videoUpload("blogposts");
exports.uploadDesktopThumbnail = blogpostImageUpload.single("desktopThumbnail");
exports.uploadMobileThumbnail = blogpostImageUpload.single("mobileThumbnail");
exports.uploadCSV = blogpostTextUpload.single("addresses");
exports.uploadCoverVideo = blogpostVideoUpload.single("earth");
exports.uploadSound = blogpostAudioUpload.single("sound");

//Factory CRUD Operations
exports.createBlogPost = factory.createOne(BlogPost);

exports.getAllBlogPosts = factory.getAll(
  BlogPost,
  { path: "author relatedPosts" },
  ["categories", "tags", "page", "subpage"]
);

exports.getBlogPost = factory.getOne(BlogPost, { path: "author relatedPosts" });

exports.updateBlogPost = factory.updateOne(BlogPost);

exports.deleteBlogPost = factory.deleteOne(BlogPost);

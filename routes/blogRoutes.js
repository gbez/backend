const express = require("express");
const blogController = require("../controllers/blogController");
const upload = require("../utilities/upload");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(
    blogController.uploadBlogFiles,
    upload.setFilenames,
    blogController.createBlog
  );
router
  .route("/id/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog)
  .patch(
    blogController.uploadBlogFiles,
    upload.setFilenames,
    blogController.updateBlog
  );
router
  .route("/:field/:name/:page")
  .get(blogController.filterBlog, blogController.getAllBlogs);
router
  .route("/:year")
  .get(blogController.filterBlog, blogController.getAllBlogs);
router
  .route("/:year/:month")
  .get(blogController.filterBlog, blogController.getAllBlogs);
router
  .route("/:year/:month/:day/:slug")
  .get(blogController.filterBlog, blogController.getBlog);

module.exports = router;

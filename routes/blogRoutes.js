const express = require("express");
const blogController = require("../controllers/blogController");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);
router
  .route("/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);
router
  .route("/:field/:name/:page")
  .get(blogController.filterBlog, blogController.getAllBlogs);
router
  .route("/:year/:month/:day/:slug")
  .get(blogController.filterBlog, blogController.getAllBlogs);

module.exports = router;

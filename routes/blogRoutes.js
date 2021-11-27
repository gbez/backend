const express = require("express");
const blogController = require("../controllers/blogController");
const authController = require("../controllers/authController");
const upload = require("../utilities/upload");
const router = express.Router();

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(authController.protect, blogController.createBlog);
router
  .route("/id/:id")
  .get(blogController.getBlog)
  .delete(blogController.deleteBlog)
  .patch(blogController.updateBlog);
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

const express = require("express");
const blogPostController = require("../../controllers/blog/blogPostController");
const authController = require("../../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(blogPostController.getAllBlogPosts)
  .post(blogPostController.createBlogPost);
router
  .route("/:id")
  .get(blogPostController.getBlogPost)
  .patch(blogPostController.updateBlogPost)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    blogPostController.deleteBlogPost
  );

module.exports = router;

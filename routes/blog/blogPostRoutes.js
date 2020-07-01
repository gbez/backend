const express = require("express");
const blogPostController = require("../../controllers/blog/blogPostController");
const authController = require("../../controllers/authController");

const router = express.Router();

//Aliases
router
  .route("/alias/:alias")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:alias/:subalias")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:alias/:subalias/:year")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:alias/:subalias/:year/:month")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:alias/:subalias/:year/:month/:slug")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
//Normal Routes
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

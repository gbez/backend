const express = require("express");
const blogPostController = require("../../controllers/blog/blogPostController");
const authController = require("../../controllers/authController");
const { setFilenames } = require("../../utilities/uploadHelper");

const router = express.Router();

//Normal Routes
router
  .route("/")
  .get(blogPostController.getAllBlogPosts)
  .post(
    authController.protect,
    blogPostController.uploadFiles,
    setFilenames,
    blogPostController.createBlogPost
  );
router
  .route("/:id")
  .get(blogPostController.getBlogPost)
  .patch(
    authController.protect,
    blogPostController.uploadFiles,
    setFilenames,
    blogPostController.updateBlogPost
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    blogPostController.deleteBlogPost
  );
//Aliases
router
  .route("/alias/:page")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:page/:subpage")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:page/:subpage/:year")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:page/:subpage/:year/:month")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);
router
  .route("/alias/:page/:subpage/:year/:month/:slug")
  .get(blogPostController.aliasBuilder, blogPostController.getAllBlogPosts);

module.exports = router;

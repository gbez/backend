const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

//GENERIC ROUTES

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
  .route("/id/:id")
  .get(userController.getUser)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUser
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    userController.updateUser
  );

//AUTH ROUTES
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/forgotPassword").post(authController.forgotPassword);
router.route("/resetPassword/:token").patch(authController.resetPassword);
router.route("/updateMyPassword");
router.route("/updateMe");

module.exports = router;

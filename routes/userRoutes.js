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
  .delete(userController.deleteUser)
  .patch(userController.updateUser);

//AUTH ROUTES
router.route("/signup");
router.route("/login");
router.route("/forgotPassword");
router.route("/resetPassword/:token");
router.route("/updateMyPassword");
router.route("/updateMe");

module.exports = router;

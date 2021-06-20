const express = require("express");
const blogController = require("../controllers/blogController");
const relationshipController = require("../controllers/relationshipController");
const authController = require("../controllers/authController");
const myMailer = require("../utilities/email/myMailer");

const router = express.Router();

router
  .route("/sendNewsletterEmail/:newsletter")
  .post(myMailer.sendNewsletterEmail);

module.exports = router;

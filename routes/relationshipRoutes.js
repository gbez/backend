const express = require("express");
const fs = require("fs");
const relatinoshipController = require("./../controllers/relationshipController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, relatinoshipController.getAllRelationships)
  .post(relatinoshipController.createRelationship);
router
  .route("/:id")
  .get(relatinoshipController.getRelationship)
  .patch(relatinoshipController.updateRelationship)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "editor"),
    relatinoshipController.deleteRelationship
  );

module.exports = router;

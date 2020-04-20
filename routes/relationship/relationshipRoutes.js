const express = require("express");
const fs = require("fs");
const relatinoshipController = require("../../controllers/relationship/relationshipController");
const authController = require("../../controllers/authController");
const noteRouter = require("../../routes/helper/noteRoutes.js");

const router = express.Router();

router.use("/:parentName/:parentId/notes", noteRouter);

//outer.use(authController.protect);

router
  .route("/")
  .get(relatinoshipController.getAllRelationships)
  .post(relatinoshipController.createRelationship);
router
  .route("/:id")
  .get(relatinoshipController.getRelationship)
  .patch(relatinoshipController.updateRelationship)
  .delete(
    authController.restrictTo("admin", "editor"),
    relatinoshipController.deleteRelationship
  );

module.exports = router;

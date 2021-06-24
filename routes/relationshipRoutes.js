const express = require("express");
const relationshipController = require("../controllers/relationshipController");
const router = express.Router();

router
  .route("/")
  .get(relationshipController.getAllRelationships)
  .post(relationshipController.createRelationship);
router
  .route("/id/:id")
  .get(relationshipController.getRelationship)
  .delete(relationshipController.deleteRelationship)
  .patch(relationshipController.updateRelationship);
router.route("/subscribe/:email").patch(relationshipController.newsletterSubscribe);
module.exports = router;

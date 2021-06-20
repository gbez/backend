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
router.route("/subscribe/").post(relationshipController.newsletterSubscribe);
router
  .route("/unsubscribe/:id")
  .post(relationshipController.newsletterUnsubscribe);
router
  .route("/subscriptionInformation/:email")
  .get(relationshipController.getSubscriptionInformation);

module.exports = router;

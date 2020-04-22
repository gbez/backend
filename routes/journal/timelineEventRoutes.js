const express = require("express");
const journalController = require("../../controllers/journal/journalController");

const router = express.Router();

router
  .route("/")
  .get(journalController.getAllTimelineEvents)
  .post(journalController.createTimelineEvent);

router
  .route("/:id")
  .get(journalController.getTimelineEvent)
  .patch(journalController.updateTimelineEvent)
  .delete(journalController.deleteTimelineEvent);

module.exports = router;

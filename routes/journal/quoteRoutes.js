const express = require("express");
const journalController = require("../../controllers/journal/journalController");

const router = express.Router();

router
  .route("/")
  .get(journalController.getAllQuotes)
  .post(journalController.createQuote);

router
  .route("/:id")
  .get(journalController.getQuote)
  .patch(journalController.updateQuote)
  .delete(journalController.deleteQuote);

module.exports = router;

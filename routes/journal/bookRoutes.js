const express = require("express");
const journalController = require("../../controllers/journal/journalController");

const router = express.Router();

router
  .route("/")
  .get(journalController.getAllBooks)
  .post(journalController.createBook);

router
  .route("/:id")
  .get(journalController.getBook)
  .patch(journalController.updateBook)
  .delete(journalController.deleteBook);

module.exports = router;

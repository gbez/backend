const express = require("express");
const noteController = require("../../controllers/helpers/noteController");
const authController = require("../../controllers/authController");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router
  .route("/")
  .post(noteController.assignNoteToModel, noteController.createNote);
router
  .route("/:id")
  .get(noteController.getNote)
  .patch(noteController.updateNote)
  .delete(authController.restrictTo("admin"), noteController.deleteNote);

module.exports = router;

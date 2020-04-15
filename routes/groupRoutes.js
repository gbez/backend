const express = require("express");
const fs = require("fs");
const groupController = require("./../controllers/groupController");

const router = express.Router();

router
  .route("/")
  .get(groupController.getAllGroups)
  .post(groupController.createGroup);
router
  .route("/:id")
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

module.exports = router;

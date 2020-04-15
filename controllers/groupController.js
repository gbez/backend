const fs = require("fs");
const Group = require("./../models/groupModel");

//example of custom middleware
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "No Name or Price"
    });
  }
  next();
};

exports.getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({
      status: "success",
      results: groups.length,
      data: {
        groups
      }
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.createGroup = async (req, res) => {
  try {
    const newGroup = await Group.create(req.body);
    res.status(200).json({
      status: "success",
      data: newGroup
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err
    });
  }
};

exports.getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: group
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.updateGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: group
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

exports.deleteGroup = async (req, res) => {
  try {
    const group = await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: group
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err
    });
  }
};

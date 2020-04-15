const fs = require("fs");
const catchAsync = require("./../utilities/catchAsync");
const Relationship = require("./../models/relationshipModel");
const factory = require("./../utilities/handlerFactory");

//example of custom middleware
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: "Fail",
      message: "No Name or Price",
    });
  }
  next();
};

exports.getAllRelationships = catchAsync(async (req, res, next) => {
  const relationships = await Relationship.find();
  res.status(200).json({
    status: "success",
    results: relationships.length,
    relationships,
  });
});

exports.createRelationship = factory.createOne(Relationship);

exports.getRelationship = catchAsync(async (req, res, next) => {
  const relationship = await Relationship.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: relationship,
  });
});

exports.updateRelationship = factory.updateOne(Relationship);

exports.deleteRelationship = factory.deleteOne(Relationship);

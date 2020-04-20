const catchAsync = require("../../utilities/catchAsync");
const Relationship = require("./../../models/relationship/relationshipModel");
const factory = require("../../utilities/handlerFactory");

//example of custom middleware

exports.getAllRelationships = factory.getAll(Relationship);

exports.createRelationship = factory.createOne(Relationship);

exports.getRelationship = factory.getOne(Relationship, { path: "notes" });

exports.updateRelationship = factory.updateOne(Relationship);

exports.deleteRelationship = factory.deleteOne(Relationship);

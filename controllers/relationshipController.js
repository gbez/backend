const Relationship = require("../models/RelationshipModel");
const factory = require("../utilities/handlerFactory");
const helpers = require("../utilities/helpers");

// Custom Middleware
exports.filterRelationship = (req, res, next) => {
  next();
};
// CRUD Operations
exports.getAllRelationships = factory.getAll(Relationship);
exports.getRelationship = factory.getOne(Relationship);
exports.createRelationship = factory.createOne(Relationship);
exports.updateRelationship = factory.updateOne(Relationship);
exports.deleteRelationship = factory.deleteOne(Relationship);

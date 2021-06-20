const Relationship = require("../models/relationshipModel");
const factory = require("../utilities/handlerFactory");
const helpers = require("../utilities/helpers");

// Custom Middleware
exports.filterRelationship = (req, res, next) => {
  next();
};

exports.newsletterSubscribe = (req, res, next) => {
  // Create One, with newsletter subscribe checked
  next();
};

exports.newsletterUnsubscribe = (req, res, next) => {
  // Reformat newsletter array
  // Update Relationship
  next();
};

exports.getSubscriptionInformation = (req, res, next) => {
  // Get Relationship by Email
  // Return Subscriptions Array
  next();
};

// CRUD Operations
exports.getAllRelationships = factory.getAll(Relationship);
exports.getRelationship = factory.getOne(Relationship);
exports.createRelationship = factory.createOne(Relationship);
exports.updateRelationship = factory.updateOne(Relationship);
exports.deleteRelationship = factory.deleteOne(Relationship);

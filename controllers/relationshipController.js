const Relationship = require("../models/relationshipModel");
const factory = require("../utilities/handlerFactory");
const catchAsync = require("../utilities/catchAsync");
const AppError = require("../utilities/appError");
const helpers = require("../utilities/helpers");

// Custom Middleware
async function patchRelationshipByEmail(_email,_body){ 
  const doc = await Relationship.findOneAndUpdate(
    {email: _email},
    _body,
    {
      new: true,
      upsert:true,
      runValidators: true
    });
  return doc;
};

exports.filterRelationship = (req, res, next) => {
  next();
};

exports.newsletterSubscribe = catchAsync(async (req, res, next) => {
    var _newsletters = req.query.newsletters.split(",");
    var body = {
      email: req.params.email,
      newsletters: _newsletters
    };
    console.log(body);
    var doc = await patchRelationshipByEmail(req.params.email,body);
    if (!doc) {
      return next(new AppError(`Patch Failed`, 404));
    }
    res.status(200).json({
      message: "success",
      data: doc
    })
  });

// CRUD Operations
exports.getAllRelationships = factory.getAll(Relationship, 0, ["newsletters"]);
exports.getRelationship = factory.getOne(Relationship);
exports.createRelationship = factory.createOne(Relationship);
exports.updateRelationship = factory.updateOne(Relationship);
exports.deleteRelationship = factory.deleteOne(Relationship);

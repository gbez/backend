const catchAsync = require("./catchAsync");
const AppError = require("./appError");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

//-----------------------------Helper Functions------------------------------->

function sanitize(query) {
  if (query) {
    const queryObject = { ...query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObject[el]);
    return queryObject;
  }
  return "";
}

async function getDistinct(Model, distinctFields) {
  let distinctReturn = {};
  for (var i = 0; i < distinctFields.length; i++) {
    var field = distinctFields[i];
    const val = await Model.distinct(field);
    distinctReturn[field] = val;
  }
  return distinctReturn;
}

//-------------------------Main Factory Functions----------------------------->

exports.getAll = (Model, popOptions, distinctFields) =>
  catchAsync(async (req, res, next) => {
    let query = Model.find(sanitize(req.query));
    if (req.query.sort) {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("-publish_date");
    }
    if (req.query.page) {
      const page = req.query.page || 1;
      const limit = req.query.limit * 1 || Number(process.env.PAGE_LIMIT);
      const skip = (page - 1) * limit;
      const numDocs = await Model.countDocuments();
      if (skip >= numDocs) {
        return next(new AppError("This Page Does Not Exist", 404));
      }
      query = query.skip(skip).limit(limit);
    }
    if (popOptions) query = query.populate(popOptions);
    const data = await query;
    let distinct;
    if (distinctFields) {
      distinct = await getDistinct(Model, distinctFields);
    }
    res.status(200).json({
      status: "success",
      results: data.length,
      distinct: distinct,
      data: data,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    console.log(`popOptions: ${popOptions}`);
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(`No document found with thtat ID`, 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(`No document found with thtat ID`, 404));
    }
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

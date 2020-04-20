const factory = require("../../utilities/handlerFactory");
const Note = require("../../models/helpers/noteModel");

exports.assignNoteToModel = (req, res, next) => {
  console.log(`req.body.onModel = ${req.path}`);
  req.body.foreignId = req.params.parentId;
  req.body.onModel = req.params.parentName;
  next();
};

exports.getAllNotes = factory.getAll(Note);

exports.createNote = factory.createOne(Note);

exports.getNote = factory.getOne(Note);

exports.updateNote = factory.updateOne(Note);

exports.deleteNote = factory.deleteOne(Note);

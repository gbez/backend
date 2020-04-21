const Group = require("./../../models/relationship/groupModel");
const Relationship = require("./../../models/relationship/relationshipModel");
const factory = require("../../utilities/handlerFactory");

//Factory CRUD Functions
exports.getAllGroups = factory.getAll(Group);

exports.createGroup = factory.createOne(Group);

exports.getGroup = factory.getOne(Group);

exports.updateGroup = factory.updateOne(Group);

exports.deleteGroup = factory.deleteOne(Group);

//Custom MiddleWare

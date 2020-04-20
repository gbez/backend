const Group = require("./../../models/relationship/groupModel");
const factory = require("../../utilities/handlerFactory");

exports.getAllGroups = factory.getAll(Group);

exports.createGroup = factory.createOne(Group);

exports.getGroup = factory.getOne(Group);

exports.updateGroup = factory.updateOne(Group);

exports.deleteGroup = factory.deleteOne(Group);

const mongoose = require("mongoose");
const Group = require("./groupModel");
const validator = require("validator");

const socialLink = new mongoose.Schema({
  mediaName: String,
  link: String,
});

const associatedRelation = new mongoose.Schema({
  relationType: String,
  relationName: String,
});

const lifeEvent = new mongoose.Schema({
  eventName: String,
  eventDate: Date,
  followUp: {
    type: Boolean,
    default: false,
  },
});

const relationshipSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      unique: false,
      required: [true, "First Name Required"],
    },
    lastName: {
      type: String,
      unique: false,
      required: [true, "Last Name Required"],
    },
    middleName: String,
    maidenName: String,
    nickname: String,
    personalEmail: {
      type: String,
      unique: true,
      required: [true, "email Required"],
      validate: [validator.isEmail, "Valid email Required"],
    },
    workEmail: {
      type: String,
      validate: [validator.isEmail, "Valid email Required"],
    },
    role: {
      type: String,
      enum: ["admin", "editor", "member"],
      default: "member",
    },
    cellPhoneNumber: {
      type: String,
      validate: [validator.isMobilePhone, "Valid phone number Required"],
    },
    homePhoneNumber: {
      type: String,
      min: [10, "10 digits required for valid phone number"],
    },
    pronouns: {
      type: String,
      enum: ["he/him", "she/her", "they/them"],
    },
    image: String,
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    address: {
      type: String,
    },
    zip: {
      type: Number,
      max: [5, "Zip Code must have 5 digits"],
    },
    relationshipStatus: {
      type: String,
      enum: ["Single", "Married", "Divorced", "Dating", "Widowed"],
    },
    dateAdded: {
      type: Date,
      default: Date.now,
    },
    birthday: Date,
    dateLastContacted: Date,
    socialLinks: {
      type: [socialLink],
      select: false,
    },
    lifeEvents: {
      type: [lifeEvent],
      select: false,
    },
    associatedRelations: {
      type: [associatedRelation],
      select: true,
    },
    pointPerson: {
      type: mongoose.Schema.ObjectId,
      ref: "Relationship",
    },
    groups: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Group",
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

relationshipSchema.index({ lastName: 1, dateAdded: -1 });

//Adding Notes as Virtual Field, Parent Referencing
relationshipSchema.virtual("notes", {
  ref: "Note",
  foreignField: "foreignId",
  localField: "_id",
});

//Pre population
relationshipSchema.pre(/^find/, function (next) {
  this.populate({
    path: "groups",
    select: "groupName",
  });
  next();
});

const Relationship = mongoose.model("Relationship", relationshipSchema);

module.exports = Relationship;

const Quote = require("./../../models/journal/quoteModel");
const TimelineEvent = require("./../../models/journal/timelineEventModel");
const Book = require("./../../models/journal/bookModel");
const factory = require("../../utilities/handlerFactory");

//Book CRUD Functions
exports.getAllBooks = factory.getAll(Book);

exports.createBook = factory.createOne(Book);

exports.getBook = factory.getOne(Book, { path: "quotes" });

exports.updateBook = factory.updateOne(Book);

exports.deleteBook = factory.deleteOne(Book);

//TimelineEvent CRUD Functions
exports.getAllTimelineEvents = factory.getAll(TimelineEvent);

exports.createTimelineEvent = factory.createOne(TimelineEvent);

exports.getTimelineEvent = factory.getOne(TimelineEvent);

exports.updateTimelineEvent = factory.updateOne(TimelineEvent);

exports.deleteTimelineEvent = factory.deleteOne(TimelineEvent);

//Quote CRUD Functions
exports.getAllQuotes = factory.getAll(Quote);

exports.createQuote = factory.createOne(Quote);

exports.getQuote = factory.getOne(Quote);

exports.updateQuote = factory.updateOne(Quote);

exports.deleteQuote = factory.deleteOne(Quote);

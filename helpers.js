module.exports = {
  dateToQuery: function (year, month, day) {
    var start = new Date(year);
    var end = new Date(String(parseInt(year) + 1));
    var dateQuery = { $gt: start, $lt: end };
    return dateQuery;
  },
};

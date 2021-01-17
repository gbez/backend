module.exports = {
  dateToQuery: function (year, month, day) {
    let start;
    let end;
    var month = month - 1;
    if (day) {
      start = new Date(year, month, day);
      end = new Date(year, month, day + 1);
    } else if (month) {
      start = new Date(year, month, day);
      end = new Date(year, month + 1, day);
    } else {
      start = new Date(year, month, day);
      end = new Date(year + 1, month, day);
    }
    var dateQuery = { $gt: start, $lt: end };
    return dateQuery;
  },
};

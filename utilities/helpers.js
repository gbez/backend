module.exports = {
  dateToQuery: function (year, month, day) {
    let start;
    let end;
    var month = month - 1;
    if (day) {
      start = new Date(year, month, day);
      end = new Date(year, month, String(parseInt(day) + 1));
    } else if (month >= 0) {
      start = new Date(year, month);
      end = new Date(year, String(parseInt(month) + 1));
    } else {
      start = new Date(year);
      end = new Date(String(parseInt(year) + 1));
    }
    var dateQuery = { $gt: start, $lt: end };
    return dateQuery;
  },
};

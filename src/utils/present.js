const moment = require('moment');

// A simple time wrapper function using moment
const present = () => ({
  minute: parseInt(moment().format('m'), 10),
  hour: parseInt(moment().format('H'), 10),
  day: parseInt(moment().format('D'), 10),
  dayOfWeek: moment().format('dddd'),
  month: moment().format('MMMM'),
  year: parseInt(moment().format('YYYY'), 10),
  dateTime: moment().format()
});

module.exports = {
  present
};

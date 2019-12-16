var mon = require('mongoose');

var addTimeSheet = require('../schemas/TIME_SHEETINFO');

module.exports = mon.model('add_time_sheet', addTimeSheet);
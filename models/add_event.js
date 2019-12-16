var mon = require('mongoose');

var addEventInfo = require('../schemas/NEW_EVENT');

module.exports = mon.model('add_event', addEventInfo);

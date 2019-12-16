const mon = require('mongoose');

const addDetailEvent = require('../schemas/ADD_DETAILS_EVENT');

module.exports = mon.model('add_detail_event', addDetailEvent);
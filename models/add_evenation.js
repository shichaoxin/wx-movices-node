var mon = require('mongoose');

var addEvenation = require('../schemes/ADD_EVENATION');

module.exports = mon.model('add_evenation', addEvenation);
var mon = require('mongoose');

var movicesInfo = require('../schemas/MOVICES_INFO');

module.exports = mon.model('movices_info', movicesInfo);
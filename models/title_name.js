var mon = require('mongoose');

var titleName = require('../schemas/TITLE_INFO');

module.exports = mon.model('title_name', titleName);
var mon = require('mongoose');

module.exports = new mon.Schema({
    userName: String,

    password: String,


    userRole: String

})
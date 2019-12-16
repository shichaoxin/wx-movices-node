const mon = require('mongoose');

module.exports = new mon.Schema({
    personal: String,

    perId: String,

    roleId: Number,

    eventId: String,

    time: String,

    messageKey: String

})
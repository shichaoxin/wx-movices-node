const mon = require('mongoose');

module.exports = new mon.Schema({
    personal: String,

    perId: String,

    roleId: Number,

    time: String,

    detail: String,

    eventId: String
})

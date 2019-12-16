const mon = require('mongoose')

module.exports = new mon.Schema({
    name: String,

    typeName: String,

    subName: String,

    level: String,

    address: String,

    time: String,

    desc: String,

    disposalStatus: Number,

    personal: String,

    perId: String,

    role: Number,
})
const mon = require('mongoose');

module.exports = new mon.Schema({
    title_id: String,

    m_name: String,

    m_time: String,

    m_price: String,

    m_evenation: String,

    m_desc: String,

    m_img: String

})
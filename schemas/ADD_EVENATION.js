var mon = require('mongoose');

module.exports = new mon.Schema({
    // 评价人员
    evenationPer: String,

    // 人员id
    evenationPerId: String,

    // 人员头像
    evenationImg: String,

    // 评价电影的id
    evenationMoviceId: String,

    // 添加的星星数字
    evenaNum: String,

    // 评价时间
    time: String,

    // 评价内容
    contentText: String
})
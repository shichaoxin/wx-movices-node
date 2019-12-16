const express = require('express')
const MessageKey = require('../config/event-status');

var router = express.Router();

// 引进表结构
const ADDEVENTINFO = require('../models/add_event');
const TIMESHEET = require('../models/add_time_sheet');
const ADDDETAILEVENT = require('../models/add_detail_event');


// 实物处置的状态
const disposalStatus = {
    // 处置中
    disposalStart: 1,
    // 处置失败结束
    disposalFail: 2,
    // 处置成功结束
    disposalSuccess: 3,
    // 处置申请上级
    disposalUp: 4

}

/**
 * 保存提交的处置信息
 */
router.post('/saveEvent', (req, res, next) => {
    const addEventInfo = new ADDEVENTINFO();
    addEventInfo.name = req.body.name;
    addEventInfo.subName = req.body.subName;
    addEventInfo.typeName = req.body.typeName;
    addEventInfo.level = req.body.level;
    addEventInfo.address = req.body.address;
    addEventInfo.time = req.body.time;
    addEventInfo.desc = req.body.desc;
    addEventInfo.perId = req.body.perId;
    addEventInfo.disposalStatus = disposalStatus.disposalStart;
    addEventInfo.personal = req.body.personal;
    addEventInfo.role = +req.body.role;
    addEventInfo.save();
    // 保存流水
    timeSheet.saveTimeSheetByEventId(
        addEventInfo.personal,
        addEventInfo.perId,
        addEventInfo.role,
        addEventInfo._id,
        addEventInfo.time,
        MessageKey.SAVEEVETNINFO);
    return res.status(200).send(true);
});

/**
 * 分页获取事务信息
 */
router.post('/getEventByPageAndSize', (req, res, next) => {
    const page = req.body.page;
    const limit = req.body.size;
    const skip = (page - 1) * limit;
    ADDEVENTINFO.countDocuments().then((total) => {
        ADDEVENTINFO.find().limit(limit).skip(skip).then((val) => {
            const messageInfo = {
                total: total,
                result: val
            }
            return res.status(200).json(messageInfo);
        })
    })
})

/**
 * 根据事件的Id获取流水信息
 */
router.get('/timeSheetInfoByEventId', (req, res, next) => {
    const eventId = req.query.id;
    if (!eventId || eventId === 'undefined') {
        return res.status(400).send(false)
    } else {
        TIMESHEET.find({ eventId: eventId }).then((result) => {
            console.log(`get timesheet success`)
            return res.status(200).json(result);
        })
    }
});

/**
 * 增加处置者对事务的备注信息
 */
router.post('/addEventthingByEventId', (req, res, next) => {
    if (!req.body.eventId || req.body.eventId === 'undefined') {
        return res.status(400).send(false)
    } else {
        console.log(req.body)
        const addDetails = new ADDDETAILEVENT();
        addDetails.personal = req.body.personal;
        addDetails.perId = req.body.perId;
        addDetails.roleId = +req.body.roleId;
        addDetails.time = req.body.time;
        addDetails.eventId = req.body.eventId;
        addDetails.detail = req.body.detail;
        addDetails.save();
        // 添加流水信息
        timeSheet.saveTimeSheetByEventId(
            addDetails.personal,
            addDetails.perId,
            addDetails.roleId,
            addDetails.eventId,
            addDetails.time,
            MessageKey.SAVEDETAILINFO);
        return res.status(200).send(true);
    }
});

/**
 * 根据事务的Id查询备注信息
 */
router.get('/getDetailByEventId', (req, res, next) => {
    const eventId = req.query.id;
    if (!eventId || eventId === 'undefined') {
        return res.status(400).send(false)
    } else {
        ADDDETAILEVENT.find({ eventId: eventId }).then((result) => {
            console.log(`get detail add success`);
            return res.status(200).json(result);
        })
    }
})



// 流水信息
const timeSheet = {
    saveTimeSheetByEventId(personal, perId, roleId, eventId, time, messageKey) {
        const timeSheet = new TIMESHEET();
        timeSheet.personal = personal;
        timeSheet.perId = perId;
        timeSheet.roleId = roleId;
        timeSheet.eventId = eventId;
        timeSheet.time = time;
        timeSheet.messageKey = messageKey;
        timeSheet.save();
    }
}



module.exports = router;
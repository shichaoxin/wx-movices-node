var express = require('express');

var router = express.Router();

// 将表引进----标题的表数据
const TITLENAME = require('../models/title_name');

// 电影信息的表结构
const MOVICESINFO = require('../models/movices_info');

// 保存电影的评价信息
const ADDEVENATION = require('../models/add_evenation');



/**
 * 保存标题信息
 */
router.post('/saveTitle', (req, res, next) => {
    const data = req.body;
    if (!data.titleName || data.titleName === 'undefined') {
        return res.status(400).json({ message: '标题不能为空' })
    } else {
        TITLENAME.findOne({ titleName: data.titleName }).then((result) => {
            if (result) {
                return res.status(400).json({
                    message: '已经存在 '
                })
            } else {
                const titel_name = new TITLENAME();
                titel_name.titleName = data.titleName;
                titel_name.personId = data.personId;
                titel_name.perosn = data.perosn;
                titel_name.time = data.time;
                titel_name.save();
                return res.send(true);
            }
        })
    }
});

/**
 *  获取标题的集合
 */
router.get('/titelLiist', (req, res, next) => {
    TITLENAME.find().then((val) => {
        return res.json(val);
    });
});


/**
 *  保存电影信息数据
 */
router.post('/saveMovice', (req, res, next) => {
    const data = req.body;
    if (!data.title_id || data.title_id === 'undefined') {
        return res.status(400).send(false);
    } else {
        const movicesInfo = new MOVICESINFO();
        movicesInfo.title_id = data.title_id;
        movicesInfo.m_name = data.m_name;
        movicesInfo.m_time = data.m_time;
        movicesInfo.m_price = data.m_price;
        movicesInfo.m_evenation = data.m_evenation;
        movicesInfo.m_desc = data.m_desc;
        movicesInfo.m_img = data.m_img;
        movicesInfo.m_swaper = data.m_swaper;
        movicesInfo.save();
        return res.send(true);
    }
});

/**
 * 根据类别的种类获取电影信息(分页获取数据)
 */
router.post('/getMovicesByTitleIdAndPageAndSize', (req, res, next) => {

    const page = +req.body.page;
    const size = +req.body.size ? +req.body.size : 5;
    const titleId = req.body.titleId;
    const limit = size;
    const skip = (page - 1) * limit;
    MOVICESINFO.find({ title_id: titleId }).countDocuments().then((total) => {
        MOVICESINFO.find({ title_id: titleId }).limit(limit).skip(skip).then((val) => {
            const message = {
                total: total,
                val: val
            }
            console.log('根据类别的种类获取电影信息(分页获取数据)--->查询成功')
            return res.status(200).json(message);
        });
    })

});

/**
 * 根据电影的id查询电影的详细信息
 */
router.get('/getMovicesDetail', (req, res, next) => {
    const moviceId = req.query.id;
    MOVICESINFO.findById({
        _id: moviceId
    }).then((val) => {
        return res.json(val);
    })
});

/**
 *  根据标题的id删除标题名称
 */
router.delete('/delteTitleById', (req, res, next) => {
    const id = req.query.id;
    TITLENAME.findByIdAndDelete({ _id: id }).then((val) => {
        return res.send(true);
    })
});

/**
 *  根据电影的id删除电影信息
 */
router.delete('/delteMovicesInfoById', (req, res, next) => {
    const id = req.query.id;
    MOVICESINFO.findByIdAndDelete({ _id: id }).then((val) => {
        return res.send(true);
    })
});


/**
 * 分页获取数据
 */
router.get('/getDataBypageAndSize', (req, res, next) => {
    const page = +req.query.page;
    const size = +req.query.size;
    const limit = size;
    const skip = (page - 1) * limit;
    TITLENAME.count().then((total) => {
        TITLENAME.find().limit(limit).skip(skip).then((val) => {
            const message = {
                total: total,
                val: val
            }
            return res.status(200).json(message);
        })
    })
});


/**
 * 保存对电影的品论信息
 */
router.post('/saveEvenation', (req, res, next) => {
    const data = req.body;
    if (!data.evenationMoviceId || !data.contentText) {
        return res.status(400).send(false);
    } else {
        const addEvenation = new ADDEVENATION();
        addEvenation.evenationPer = data.evenationPer;
        addEvenation.evenationPerId = data.evenationPeoId;
        addEvenation.evenationImg = data.evenationImg;
        addEvenation.evenationMoviceId = data.evenationMoviceId;
        addEvenation.evenaNum = data.evenaNum;
        addEvenation.time = data.time;
        addEvenation.contentText = data.contentText;
        addEvenation.save();
        console.log('------保存评价信息成功-----------')
        return res.status(200).send(true);
    }
});

/**
 * 根据电影的id获取电影的评论信息集合
 */
router.get('/getMoviesMessageByMoviesId', (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        return res.status(400).send(false)
    } else {
        ADDEVENATION.find({
            evenationMoviceId: id
        }).then((val) => {
            console.log('----------获取评论信息成功----------')
            return res.status(200).json(val);
        });
    }
})




module.exports = router;
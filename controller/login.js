var express = require('express');

var router = express.Router();

// var jwt = require('jsonwebtoken');

// var KeyName = require('../config/keys');


// const passport = require('passport')
// 引用表结构

var USERINFO = require('../models/user_info');

var messageCode = {
    messageLoginSuccess: 0, // 用户成功登陆,
    messageError: 1, // 用户信息错误
    messageNotFound: 2, // 用户不存在,
    messageAlreadyExist: 3, // 用户已经存在
    messageRegisterSuccess: 4 // 用户注册成功

}


// 用户登陆
router.post('/userInfo', (req, res, next) => {
    USERINFO.findOne({
        userName: req.body.userName,
        password: req.body.password
    }).then((result) => {
        if (result) {
            const messageInfo = {
                code: messageCode.messageLoginSuccess,
                message: '用户登陆成功',
                data: result,
            }
            // sign(规则，加密的名字，过期时间，箭头函数)
            // const rule = {
            //     id: result._id,
            // };
            // jwt.sign(rule, KeyName.selectKey, {
            //     expiresIn: 3600
            // }, (err, token) => {
            //     if (err) throw err;
            //     res.status(200).json({
            //         success: true,
            //         token,
            //         messageInfo
            //     })
            // })
            res.status(200).json({
                success: true,
                token: 'bear' + '123434rgdsfgsrtert45tweregf',
                messageInfo
            });
            console.log('success for login')
        } else {
            const messageInfo = {
                code: messageCode.messageNotFound,
                message: '用户不存在，请注册'
            }
            res.status(404).send(messageInfo);
        }
    })
});

// 用户注册
router.post('/register', (req, res, next) => {
    USERINFO.findOne({
        userName: req.body.userName,
        userPhone: req.body.userPhone
    }).then((result) => {
        if (result) {
            const messageInfo = {
                code: messageCode.messageAlreadyExist,
                message: '用户已经存在'
            }
            return res.send(messageInfo);
        } else {
            // 用户注册
            const userInfoMessage = new USERINFO();
            userInfoMessage.userName = req.body.userName;
            userInfoMessage.password = req.body.password;
            userInfoMessage.userRole = req.body.userRole;
            userInfoMessage.save();
            const messageInfo = {
                code: messageCode.messageRegisterSuccess,
                message: '用户注册成功',
                data: userInfoMessage,
                token: 'bear' + '123434rgdsfgsrtert45tweregf'
            }
            return res.status(200).send(messageInfo);
        }
    })
});

/**
 * 获取用户信息集合分页模式
 */
router.post('/getsUserInfoByPage', (req, res, next) => {
    const page = +req.body.currentPage;
    const size = +req.body.currentSize;
    const limit = size;
    const skip = (page - 1) * limit;
    USERINFO.countDocuments().then((total) => {
        USERINFO.find().limit(limit).skip(skip).then((val) => {
            const message = {
                result: val,
                total: total
            }
            console.log('获取用户信息集合分页模式-success')
            return res.json(message);
        })
    })
});

/**
 * 根据用户的id删除用户信息
 */
router.delete('/deleteUserInfoByUserId', (req, res, next) => {
    const userId = req.query.id;
    // 操作者的Id信息====> 0是超级管理员，1是管理员，2是VIP 3是普通用户
    const roleId = +req.query.roleId;
    USERINFO.findById({ _id: userId }).then((val) => {
        if (roleId < +val.userRole) {
            // 可以删除
            USERINFO.findByIdAndDelete({ _id: userId }).then((val) => {
                console.log('删除用户信息成功')
                return res.send(true);
            })
        } else {
            console.log('权限不够')
            return res.status(401).send(false);
        }
    })
})



module.exports = router;
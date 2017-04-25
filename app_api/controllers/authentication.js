﻿require('../models/db');
var _require = require('../models/schemas'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('UserCollection', _require.userSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.register = function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {message: "请完成所有字段"});
        return;
    }
    var user = new UserModel();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (err) {
        if (err) {
            sendJSONresponse(res, 404, '注册账号出错了');
            return;
        } else {
            var token = user.generateJwt();
            sendJSONresponse(res, 200, {'token': token});
        }
    });
};
module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {message: '请输入邮箱和密码!'});
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {token: token});
        } else {
            sendJSONresponse(res, 401, info);
        }

    })(req, res);

};
module.exports.getThePerson = function (req, res) {
    var _person = req.params.person;
    UserModel.findOne({name: _person}).exec(function (err, book) {
        if (!_person) {
            sendJSONresponse(res, 404, {
                "message": "person not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, book);

    });
};
module.exports.UpdateOneUser = function (req, res) {

}
module.exports.DeleteOneUser = function (req, res) {
    var userId = req.payload._id;
    if (userId) {
        UserModel.findByIdAndRemove(userId)
            .exec(function (err) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, {message: "No userId"});
    }
}
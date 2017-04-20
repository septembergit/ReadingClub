require('../models/db');
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
    user.setPassword(req.body.password);
    user.save(function (err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, {'token': token});
        }

    });
};
module.exports.login = function (req, res) {
    if (!req.body.email || !req.body.password) {
        console.log('没填写邮箱与密码！');
        sendJSONresponse(res, 400, {message: '请输入邮箱和密码!'});
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        console.log('进入密码验证！');
        var token;
        if (err) {
            console.log('出了错误！');
            sendJSONresponse(err, 404, err);
            return;
        }
        if (user) {
            console.log('成功');
            token = user.generateJwt();
            sendJSONresponse(res, 200, {token: token});
        } else {
            sendJSONresponse(res, 401, info);
        }

    })(req, res);
};
var passport = require('passport'),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('UserCollection'),      // 创建模型，可以用它来操作数据库中的UserCollection集合（表）
    sendJSONresponse = function (res, status, content) {     // 包含返回的数据和http状态码
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

// 第二步验证,数据保存之前
module.exports.login = function (req, res) {
    console.log('测试一下看是否进来了这个方法 登录');
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {message: '请输入邮箱和密码!'});
        return;
    }
    passport.authenticate('local', function (err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(err, 404, err);
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
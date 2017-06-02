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
    var _person = req.params.personId;
    UserModel.findOne({_id: _person}).exec(function (err, person) {
        if (!_person) {
            sendJSONresponse(res, 404, {
                "message": "person not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, person);
    });
};

module.exports.UpdateOneUser = function (req, res) {
    var _userId = req.params.userId;
    UserModel.findById(_userId).exec(function (err, user) {
        if (!user) {
            sendJSONresponse(res, 404, {
                "message": "userId not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        user.name = req.body.username || user.name;
        user.password = req.body.new_psw || user.password;
        user.per_signature = req.body.per_signature || user.per_signature;
        user.img = req.body.img || user.img;
        user.hobby = req.body.hobby;
        user.travels = req.body.travels;
        user.brief = req.body.brief;
        user.save(function (err, user) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, user);
            }
        });
    });

};

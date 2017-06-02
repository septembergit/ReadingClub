require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    UserModel = mongoose.model('UserCollection', _require.userSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getCollections = function (req, res) {
    var _personId = req.params.personId;
    UserModel.findById(_personId, function (err, collections) {
        if (collections) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 200, collections);
            }
        }
    });
};

module.exports.handleBook = function (req, res) {
    var _userId = req.body.userId || '';
    var isExisted = false;
    UserModel.findById(_userId, function (err, user) {
        if (!user) {
            sendJSONresponse(res, 404, {
                "message": "userId not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        for (var i = 0; i < user.want_book.length; i++) {
            if (user.want_book[i].book_id === req.body.bookId) {
                isExisted = true;
                sendJSONresponse(res, 200, {
                    "message": "此书已经被加入到您的想读中!"
                });
                break;
            }
        }
        if (!isExisted) {
            user._id = req.body.userId;
            user.password = user.password;
            user.email = user.email;
            user.name = user.name;
            user.user_img = user.user_img;
            user.per_signature = user.per_signature;
            user.createdOn = user.createdOn;
            user.want_book.push({
                'book_id': req.body.bookId,
                'book_img': req.body.bookImg || ''
            });
            user.save(function (err, user) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                } else {
                    sendJSONresponse(res, 200, user);
                }
            });
        }
    });
};
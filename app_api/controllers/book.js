require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    BookModel = mongoose.model('BookCollection', _require.bookSchema),
    UserModel = mongoose.model('UserCollection', _require.userSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

// 查询数据库确定是否登录拥有部分操作权限
var getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.email) {
        UserModel.findOne({email: req.payload.email})
            .exec(function (err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {message: "User not found"});
                    return;
                }
                else if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                callback(req, res, user);
            });
    } else {
        sendJSONresponse(res, 404, {
            message: "User not found"
        });
        return;
    }

};

module.exports.getBooks = function (req, res) {
    BookModel.find({}, function (err, books) {
        if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, books);
    });
};

module.exports.CreateOneBook = function (req, res) {
    var _tags = req.body.tags.split('，');
    getAuthor(req, res, function (req, res, user) {
        BookModel.create({
            title: req.body.title,
            auth: req.body.auth,
            press: req.body.press,
            img: req.body.img,
            tags: _tags,
            brief: req.body.brief,
            ISBN: req.body.ISBN,
            rating: req.body.rating,
            username: user.name,
            userId: user._id
        }, function (err, book) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 201, book);
            }
        });
    });
};

module.exports.getOneBook = function (req, res) {
    var _book = req.params.bookId;
    BookModel.findOne({_id: _book}).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "book not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, book);

    });
};

module.exports.DeleteOneBook = function (req, res) {
    var _bookId = req.params.bookId;
    if (_bookId) {
        BookModel.findByIdAndRemove(_bookId)
            .exec(function (err) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, {message: "No bookId"});
    }
};

module.exports.UpdateOneBook = function (req, res) {
    console.log('现在现在现在', req.body);
    var _bookId = req.params.bookId;
    BookModel.findById(_bookId).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookId not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        book.title = req.body.title || book.title;
        book.rating = req.body.rating || book.rating;
        book.auth = req.body.auth || book.auth;
        book.press = req.body.press || book.press;
        book.img = req.body.img || book.img;
        book.tags = req.body.tags || book.tags;
        book.brief = req.body.brief || book.brief;
        book.ISBN = req.body.ISBN || book.ISBN;
        book.comments.push({
            'comment': req.body.comment,
            'commentUser': req.body.commentUser,
            'commentUserId': req.body.commentUserId
        });
        book.save(function (err, book) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, book);
            }
        });
    });
};

module.exports.DeleteOneBook = function (req, res) {
    var _bookId = req.params.bookId;
    if (_bookId) {
        BookModel.findByIdAndRemove(_bookId)
            .exec(function (err) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, {message: "No bookId"});
    }
};


var fs = require('fs'),
    formidable = require('formidable');
module.exports.uploadImg = function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = './../public/upload/temp/';          // 设置上传文件存放的文件夹
    form.keepExtensions = true;                           // 使得上传的文件保持原来的文件的扩展名
    form.maxFieldsSize = 3 * 1024 * 1024;

    form.parse(req, function (err, fields, files) {
        if (err) {
            sendJSONresponse(res, 404, 0);
        }
        for (var key in files) {
            var extName = '';
            switch (key.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                case 'image/x-png':
                default:
                    extName = 'png';
                    break;
            }
            var avatarName = (new Date()).getTime() + '.' + extName;
            var newPath = form.uploadDir + avatarName;

            fs.renameSync(files[key].path, newPath);
            sendJSONresponse(res, 200, "/upload/temp/" + avatarName);
        }
    });
};

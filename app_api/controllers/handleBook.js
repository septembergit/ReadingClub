require('../models/db.js');
var mongoose = require('mongoose'),
    BookModel = mongoose.model('Book'),
    UserModel = mongoose.model('User'),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

var getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.email) {
        UserModel.findOne({email: req.payload.email})
            .exec(function (err, user) {
                if (!user) {
                    sendJSONresponse(res, 404, {message: "User not found"});
                    return;
                }
                else if (err) {
                    console.log(err);
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

module.exports.books = function (req, res) {
    BookModel.find().exec(function (err, books) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, books);
    });
};

module.exports.bookCreate = function (req, res) {
    getAuthor(req, res, function (req, res, user) {
        console.log("imgurl:", req.body.img);
        BookModel.create({
            title: req.body.title,
            info: req.body.info,
            img: req.body.img,
            tags: req.body.tags,
            brief: req.body.brief,
            ISBN: req.body.ISBN,
            rating: req.body.rating,
            username: user.name,
            userId: user._id
        }, function (err, book) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 400, err);
            } else {
                console.log("�����鼮:", book);
                sendJSONresponse(res, 201, book);
            }
        });
    });
};

module.exports.bookReadOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    BookModel.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        console.log(book);
        sendJSONresponse(res, 200, book);

    });

};


//
module.exports.bookUpdateOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    BookModel.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        book.title = req.body.title;
        book.rating = req.body.rating;
        book.info = req.body.info;
        book.img = req.body.img;
        book.tags = req.body.tags;
        book.brief = req.body.brief;
        book.ISBN = req.body.ISBN;
        book.save(function (err, book) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, book);
            }
        });
    });


};

// 删除书籍
module.exports.bookDeleteOne = function (req, res) {
    var bookid = req.params.bookid;
    if (bookid) {
        BookModel.findByIdAndRemove(bookid)
            .exec(function (err) {
                if (err) {
                    console.log(err);
                    sendJSONresponse(res, 404, err);
                    return;
                }
                console.log("book id :" + bookid + "deleted");
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, {message: "No bookid"});
    }
};

// 图片上传
var fs = require('fs'),
    formidable = require('formidable');
module.exports.uploadImg = function (req, res) {
    var form = new formidable.IncomingForm();        // 创建上传表单
    form.encoding = 'utf-8';                         // 设置编辑
    form.uploadDir = './../public/upload/temp/';     // 设置上传目录
    form.keepExtensions = true;                      // 保留后缀
    form.maxFieldsSize = 3 * 1024 * 1024;            // 文件大小

    form.parse(req, function (err, fields, files) {
        if (err) {
            sendJSONresponse(res, 404, 0);
        }
        for (var key in files) {
            console.log(files[key].path);
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
            var avatarName = (new Date()).getTime() + '.' + extName,
                newPath = form.uploadDir + avatarName;

            fs.renameSync(files[key].path, newPath);
            sendJSONresponse(res, 200, "/upload/temp/" + avatarName);
        }
    });
};

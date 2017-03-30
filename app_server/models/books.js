var mongoose = require('mongoose');

// 在Mongoose中定义一个document的对象称为schema
var bookSchema = new mongoose.Schema({
    title: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: String,
    img: String,
    tags: [String],
    brief: String,
    ISBN: String
});

var userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    ip: String,
    mobile: String
});

var commentSchema = new mongoose.Schema({
    user: userSchema,               // 一个schema可以包含另外的schema或者数组
    createdOn: {
        type: Date,
        default: Date.now
    },
    content: String
});

var topicSchema = new mongoose.Schema({
    title: String,
    type: String,
    visitedCount: {type: Number, default: 0},
    commentCount: {type: Number, default: 0},
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    author: String,
    content: String,
    comments: [commentSchema],
    deleted: {type: Boolean, default: false},
    top: {type: Boolean, default: false},
    good: {type: Boolean, default: false},
});

// 注册使其具备操作数据库的能力
mongoose.model('Book', bookSchema);
mongoose.model('Topic', topicSchema);


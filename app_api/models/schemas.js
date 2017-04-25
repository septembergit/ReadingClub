var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto'),
    jwt = require('jsonwebtoken');

// 在Mongoose中定义一个document的对象称为schema
// 第三部验证，数据保存的时候
var bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: {
        type: String,
        required: true
    },
    img: String,
    tags: [String],
    brief: {
        type: String,
        required: true
    },
    ISBN: String,
    comments: [String],
    username: String,
    userId: String
});

var userSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    password: {      // 测试添加
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: String,
    salt: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    per_signature: {
        type: String,
        default: '需要一个强势的签名'
    },
    img: String,
    ip: String
});

// 设置密码
userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');        // 生成一个16位的随机字符串作为salt
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');   // 用户密码加盐值再进行加密得到哈希值
};

// 验证方法
userSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);
    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000)      // 过期时间
    }, process.env.JWT_SECRET);
};

var commentSchema = new Schema({
    user: userSchema,
    createdOn: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

var topicSchema = new Schema({
    title: String,
    type: String,
    visitedCount: {
        type: Number,
        default: 0
    },
    commentCount: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
    user_img: String,
    author: String,
    content: String,
    comments: [commentSchema],         // 一个schema可以包含另外的schema或者数组
    deleted: {
        type: Boolean,
        default: false
    },
    top: {
        type: Boolean,
        default: false
    },
    good: {
        type: Boolean,
        default: false
    }
});

var talkSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    userId: String,
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_img: {
        type: String,
        required: true
    },
    talk_img: String,
    brief: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

module.exports = {
    bookSchema: bookSchema,
    topicSchema: topicSchema,
    userSchema: userSchema,
    commentSchema: commentSchema,
    talkSchema: talkSchema
}



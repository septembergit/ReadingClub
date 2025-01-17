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
    auth: {
        type: String,
        required: true
    },
    press: {
        type: String,
        required: true
    },
    book_img: String,
    tags: [String],
    brief: {
        type: String,
        required: true
    },
    ISBN: String,
    comments: [Schema.Types.Mixed],
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
    user_img: String,
    want_book: [Schema.Types.Mixed],
    hobby: String,
    travels: String,
    brief: String
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
    commentUser: userSchema,
    commentDate: {
        type: Date,
        default: Date.now
    },
    comment: {
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
    userImg: String,
    userName: String,
    userId: String,
    content: String,
    comments: [Schema.Types.Mixed]         // 一个schema可以包含另外的schema或者数组
});

var talkSchema = new Schema({
    lift_piece: String,
    web_link: String,
    web_reason: String,
    diary_title: String,
    diary_content: String,
    talk_img: [String],
    user_img: String,
    userName: String,
    userId: String,
    diary_tags: [String],
    createdOn: {
        type: Date,
        default: Date.now
    },
    type: String
});

module.exports = {
    bookSchema: bookSchema,
    topicSchema: topicSchema,
    userSchema: userSchema,
    commentSchema: commentSchema,
    talkSchema: talkSchema
}



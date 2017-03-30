var mongoose = require('mongoose'),
    crypto = require('crypto'),
    jwt = require('jsonwebtoken');

var bookSchema = new mongoose.Schema({
    title: {type: String, required: true},
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: {type: String, required: true},
    img: String,
    tags: [String],
    brief: {type: String, required: true},
    ISBN: String,
    username: String,
    userId: String
});

var userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    hash: String,
    salt: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    ip: String,
    mobile: String
});


userSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    //1000����������� 64������
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

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
        exp: parseInt(expiry.getTime() / 1000)
    }, process.env.JWT_SECRET);
};


var commentSchema = new mongoose.Schema({
    user: userSchema,
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

mongoose.model('Book', bookSchema);
mongoose.model('Topic', topicSchema);
mongoose.model('User', userSchema);


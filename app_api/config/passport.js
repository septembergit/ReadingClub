var _require = require('../models/schemas'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    UserModel = mongoose.model('UserCollection', _require.userSchema);

// options参数设置要验证的字段名称
passport.use(new LocalStrategy({usernameField: 'email'}, function (username, password, done) {   // 验证回调
    UserModel.findOne({email: username}, function (err, user) {
        console.log(user);
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: '用户不存在'});
        }
        // if (!user.validPassword(password)) {
        //     return done(null, false, {message: '密码错误!'});
        // }
        return done(null, user);
    });
}))
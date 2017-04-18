var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongoose = require('mongoose'),
    UserModel = mongoose.model('UserCollection');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, function (username, password, done) {
    UserModel.findOne({email: username}, function (err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {message: '用户不存在'});
        }
        if (!user.validPassword(password)) {
            return done(null, false, {message: '密码错误!'});
        }
        return done(null, user);

    });
}))
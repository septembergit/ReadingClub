﻿require('dotenv').load();
var express = require('express'),
    app = express();

var path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routesApi = require('./app_api/routes/index'),
    uglifyJs = require("uglifyjs"),
    fs = require('fs');

var appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/main/services/ReadData.service.js',
    'app_client/main/services/authentication.service.js',
    'app_client/main/filters/formatDate.filter.js',
    'app_client/main/directive/ratingStars/ratingStars.directive.js',
    'app_client/main/directive/footer/footer.directive.js',
    'app_client/main/directive/header/header.directive.js',
    'app_client/main/directive/header/header.controller.js',
    'app_client/main/directive/editor/editor.controller.js',
    'app_client/discuss/discuss.controller.js',
    'app_client/personal/personal.controller.js',
    'app_client/books/books.controller.js',
    'app_client/bookDetail/bookDetail.controller.js',
    'app_client/bookModal/bookModal.controller.js',
    'app_client/auth/register/register.controller.js',
    'app_client/auth/login/login.controller.js',
];

var uglified = uglifyJs.minify(appClientFiles, {compress: false});
fs.writeFile('public/angular/readApp.min.js', uglified.code, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('脚本生产并保存成功');
    }
});


// 注册一系列中间件
app.use(logger('dev'));        // 日志,在开发环境下用彩色输出响应状态,会显示请求方式,响应时间和大小
app.use(bodyParser.json());    // 解析json
app.use(bodyParser.urlencoded({extended: false}));     // 解析form请求
app.use(cookieParser());       //解析cookie
app.use(require('stylus').middleware(path.join(__dirname, 'public')));  // 使用stylus做css预编译
app.use(express.static(path.join(__dirname, 'public')));         // 设置静态文件路径
app.use(express.static(path.join(__dirname, 'app_client')));
app.use(function (req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

var passport = require('passport');
require('./app_api/config/passport');
app.use(passport.initialize());
app.use('/api', routesApi);           // 将匹配以'/api'开头的路径

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res) {
    if (err.name == 'UnauthorizedError') {
        res.status(401);
        res.json({message: err.name + ":" + err.message});
    }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

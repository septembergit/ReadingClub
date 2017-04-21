require('./schemas.js');
var mongoose = require('mongoose'),
    db = mongoose.connection,       // 连接状态
    dbUrl = 'mongodb://localhost/test';
    // dbUrl = 'mongodb://reader:loveReading@ds021343.mlab.com:21343/readingdb';
mongoose.connect(dbUrl);      // 连接数据库
mongoose.Promise = global.Promise;      // resolve the promise problem

db.on('connected', function () {
    console.log('Mongoose connected to ' + dbUrl);
});
db.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
db.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

// 当应用重启或终止的时候关闭连接
gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};

// 如果是nodemon重启，需要监听SIGUSR2事件
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// 应用终止需要监听nodejs的进程的SIGTERM事件
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});

// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});
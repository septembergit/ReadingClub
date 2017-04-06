require('./schemas.js');
var mongoose = require('mongoose'),
    db = mongoose.connection,       // 连接状态
    dbURI = 'mongodb://localhost/test';
mongoose.connect(dbURI);           // 连接数据库

db.on('open', function () {
    console.log('数据库连接成功！' + dbURI);
});
db.on('error', function (err) {
    console.log('数据库连接出现了一些错误:' + err);
});
db.on('disconnected', function () {
    console.log('数据库连接失败！');
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
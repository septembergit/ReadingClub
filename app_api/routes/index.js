var express = require('express'),
    jwt = require('express-jwt'),         // 保护'/api'的每个调用
    auth = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    });
var bookCtrl = require('../controllers/handleBook'),
    topicCtrl = require('../controllers/topic'),
    authCtrl = require('../controllers/authentication');
const router = express.Router();

// 匹配路由,根据路由地址决定脚本去响应客户端请求
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/books', bookCtrl.books);
router.post('/book', auth, bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', auth, bookCtrl.bookUpdateOne);
router.delete('/book/:bookid', auth, bookCtrl.bookDeleteOne);
// router.get('/topics', topicCtrl.topics);
router.post('/uploadImg', bookCtrl.uploadImg);
router.get('/topics', function () {
    console.log('接收到了get请求！');
    return {
        'title': '《明朝》',
        'type': '读书',
        '_user': '子不语'
    };
});
module.exports = router;





var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),
    auth = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    });
var bookCtrl = require('../controllers/handleBook'),
    topicCtrl = require('../controllers/topic'),
    ctrlAuth = require('../controllers/authentication');

// 根据路由地址决定脚本去响应客户端请求
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/books', bookCtrl.books);
router.post('/book', auth, bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', auth, bookCtrl.bookUpdateOne);
router.delete('/book/:bookid', auth, bookCtrl.bookDeleteOne);

// topics
router.get('/topics', topicCtrl.topics);
router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;





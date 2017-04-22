var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),        // 配置express保护每个/api的调用
    auth = jwt({
        secret: process.env.JWT_SECRET,
        userProperty: 'payload'
    });

var bookCtrl = require('../controllers/book'),
    topicCtrl = require('../controllers/topic'),
    talkCtrl = require('../controllers/talk'),
    authCtrl = require('../controllers/authentication');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/person/:person', authCtrl.getThePerson);

router.get('/books', bookCtrl.getBooks);
router.post('/book', auth, bookCtrl.CreateOneBook);
router.get('/book/:book', bookCtrl.getOneBook);
router.put('/book/:bookid', auth, bookCtrl.UpdateOneBook);
router.delete('/book/:bookid', auth, bookCtrl.DeleteOneBook);

router.get('/topics/:topicType', topicCtrl.getTopics);
router.get('/talks', talkCtrl.getTalks);
router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;





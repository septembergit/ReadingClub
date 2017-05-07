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
router.get('/person/:personId', authCtrl.getThePerson);
router.put('/user/:userId', authCtrl.UpdateOneUser);
router.delete('/user/:user', auth, authCtrl.DeleteOneUser);

router.get('/books', bookCtrl.getBooks);
router.post('/book', auth, bookCtrl.CreateOneBook);
router.get('/book/:bookId', bookCtrl.getOneBook);
router.put('/book/:bookId', auth, bookCtrl.UpdateOneBook);
router.delete('/book/:bookId', auth, bookCtrl.DeleteOneBook);

router.get('/topics/:topicType', topicCtrl.getTopics);
router.get('/talks', talkCtrl.getTalks);
router.delete('/book/:talkid', auth, talkCtrl.DeleteOneTalk);
router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;





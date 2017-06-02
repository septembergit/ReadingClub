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
    collectCtrl = require('../controllers/collection'),
    authCtrl = require('../controllers/authentication');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/person/:personId', authCtrl.getThePerson);
router.put('/user/:userId', auth, authCtrl.UpdateOneUser);

router.get('/books/:personId', bookCtrl.getBooks);
router.post('/book', auth, bookCtrl.CreateOneBook);
router.get('/book/:bookId', bookCtrl.getOneBook);
router.put('/book/:bookId', auth, bookCtrl.UpdateOneBook);
router.delete('/book/:bookId', auth, bookCtrl.DeleteOneBook);

router.get('/topic/:topicId', topicCtrl.getOneTopic);
router.put('/c_onetopic/:topicId', auth, topicCtrl.addComments);
router.get('/topics/:topicType', topicCtrl.getTopics);
router.post('/topics', auth, topicCtrl.CreateOnePost);

router.get('/talks/:personId', talkCtrl.getTalks);
router.get('/talk/:talkId', talkCtrl.getOneTalk);
router.post('/talk', auth, talkCtrl.CreateOneTalk);
router.delete('/talk/:talkId', auth, talkCtrl.DeleteOneTalk);

router.get('/collections/:personId', collectCtrl.getCollections);
router.put('/h_book/', auth, collectCtrl.handleBook);

router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;





var express = require('express'),
    router = express.Router(),
    jwt = require('express-jwt'),
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

router.get('/books', bookCtrl.getBooks);
router.post('/book', auth, bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', auth, bookCtrl.bookUpdateOne);
router.delete('/book/:bookid', auth, bookCtrl.bookDeleteOne);

router.get('/topics', topicCtrl.getTopics);
router.get('/talks', talkCtrl.getTalks);
router.post('/uploadImg', bookCtrl.uploadImg);

module.exports = router;





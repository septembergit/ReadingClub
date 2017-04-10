var express = require('express'),
    router = express.Router(),    //express的路由需要一个一个区配置
    homeController = require('../controllers/home'),
    ctrlOthers = require('../controllers/other');

//根据路由地址决定脚本去响应客户端请求
router.get('/', ctrlOthers.angularApp);
router.get('/discuss', homeController.discuss);
router.get('/books', homeController.books);
router.get('/book/create', homeController.bookcreateview);
router.post('/book/create', homeController.doBookCreate);
router.delete('/book/:id', homeController.delete);
router.post('/uploadImg', homeController.uploadImg);
router.get('/detail/:id', homeController.detail);

module.exports = router;





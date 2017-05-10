require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    CollectModel = mongoose.model('collectionSchema', _require.collectionSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getCollections = function (req, res) {
    CollectModel.find({}, function (err, collections) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, collections);
        }
    })
};
module.exports.handleBook = function (req, res) {
    CollectModel.create({
        user_id: req.body.userId || '',
        // want_book: want_book.push(req.body.bookId)
    }, function (err, collection) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, collection);
        }
    });
};
require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    TopicModel = mongoose.model('TopicCollection', _require.topicSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getTopics = function (req, res, next) {
    TopicModel.find({}, function (err, topics) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, topics);
        }
    })
};

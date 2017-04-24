require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    TopicModel = mongoose.model('TopicCollection', _require.topicSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getTopics = function (req, res) {
    var _type = req.params.topicType;
    if (_type === '全部') {
        TopicModel.find({}, function (err, topics) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 200, topics);
            }
        })
    } else {
        TopicModel.find({type: _type}, function (err, topics) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 200, topics);
            }
        })
    }
};

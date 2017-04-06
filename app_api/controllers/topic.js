var mongoose = require('mongoose'),
    TopicModel = mongoose.model('TopicCollection'),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.topics = function (req, res) {
    TopicModel.find().exec(function (err, topic) {
        if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, topic);
    });
};

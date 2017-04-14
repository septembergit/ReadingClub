var mongoose = require('mongoose'),
    TopicModel = mongoose.model('TopicCollection'),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.topics = function (req, res) {
    TopicModel.find({}, function (err, topic) {
        if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        res.statusCode(200).send(topic);
    });
};

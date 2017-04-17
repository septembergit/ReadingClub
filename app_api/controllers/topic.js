var mongoose = require('mongoose'),
    TopicModel = mongoose.model('TopicCollection'),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

function getTopics(req, res) {
    console.log(req, '111');
    TopicModel.find({}, function (err, topic) {
        if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        res.statusCode(200).send(topic);
    });
};

module.exports = {
    getTopics: getTopics
}
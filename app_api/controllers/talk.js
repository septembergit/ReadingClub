var mongoose = require('mongoose'),
    TalkModel = mongoose.model('TalkCollection'),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getTalks = function (req, res) {
    TalkModel.find({}, function (err, talk) {
        if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        res.statusCode(200).send(talk);
    });
};
require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    TalkModel = mongoose.model('TalkCollection', _require.talkSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getTalks = function (req, res) {
    TalkModel.find({}, function (err, talks) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, talks);
        }
    })
};
module.exports.CreateOneTalk = function () {
    TalkModel.create({
        userName: req.body.userName,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    }, function (err, talk) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, talk);
        }
    });
};
module.exports.DeleteOneTalk = function () {
    var talkId = req.params.talkId;
    if (talkId) {
        TalkModel.findByIdAndRemove(talkId)
            .exec(function (err) {
                if (err) {
                    sendJSONresponse(res, 404, err);
                    return;
                }
                sendJSONresponse(res, 204, null);
            });
    } else {
        sendJSONresponse(res, 404, {message: "No talkId"});
    }
};

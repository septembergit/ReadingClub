require('../models/db');
var _require = require('../models/schemas'),
    mongoose = require('mongoose'),
    TalkModel = mongoose.model('TalkCollection', _require.talkSchema),
    sendJSONresponse = function (res, status, content) {
        res.status(status);
        res.json(content);
    };

module.exports.getTalks = function (req, res) {
    var _personId = req.params.personId;
    if (_personId === 'all') {
        TalkModel.find({}, function (err, talks) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 200, talks);
            }
        })
    } else {
        TalkModel.find({userId: _personId}, function (err, talks) {
            if (err) {
                sendJSONresponse(res, 400, err);
            } else {
                sendJSONresponse(res, 200, talks);
            }
        })
    }
};

module.exports.CreateOneTalk = function (req, res) {
    TalkModel.create({
        lift_piece: req.body.lift_piece || '',
        web_link: req.body.web_link || '',
        web_reason: req.body.web_reason || '',
        diary_title: req.body.diary_title || '',
        diary_content: req.body.diary_content || '',
        talk_img: '',
        user_img: '',
        userName: req.body.userName || '',
        userId: req.body.userId || '',
        diary_auth: 0,
        diary_tags: req.body.checkModel || '',
        type: req.body.type
    }, function (err, talk) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, talk);
        }
    });
};

module.exports.DeleteOneTalk = function (req, res) {
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

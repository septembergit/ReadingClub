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

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

module.exports.getOneTopic = function (req, res) {
    var _topicId = req.params.topicId;
    TopicModel.findById(_topicId, function (err, topic) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 200, topic);
        }
    })

};

module.exports.CreateOnePost = function (req, res) {
    TopicModel.create({
        title: req.body.bookTitle,
        type: req.body.radioModel,
        content: req.body.content,
        userImg: '',
        userName: req.body.userName,
        userId: req.body.userId,
        comments: []
    }, function (err, topic) {
        if (err) {
            sendJSONresponse(res, 400, err);
        } else {
            sendJSONresponse(res, 201, topic);
        }
    });
};

module.exports.UpdateOneTopic = function (req, res) {
    var _topicId = req.params.topicId;
    console.log(req.body);
    TopicModel.findById(_topicId, function (err, topic) {
        if (!topic) {
            sendJSONresponse(res, 404, {
                "message": "topicId not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        topic.title = topic.title;
        topic.type = topic.type;
        topic.visitedCount = topic.visitedCount;
        topic.commentCount = topic.commentCount;
        topic.createdOn = topic.createdOn;
        topic.userImg = '';
        topic.userName = topic.userName;
        topic.userId = topic.userId;
        topic.content = topic.content;
        topic.comments.push({'comment': req.body.comment, 'commentUser': req.body.commentUser, 'commentUserId': req.body.commentUserId});
        topic.save(function (err, topic) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, topic);
            }
        });
    });
}

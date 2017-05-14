angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData)
    .service('talksData', talksData);

topicData.$inject = ['$http', 'authentication'];
booksData.$inject = ['$http', 'authentication'];
talksData.$inject = ['$http', 'authentication'];

function topicData($http, authentication) {
    var getByType = function (param) {
        return $http.get('/api/topics/' + param);
    };
    var addPost = function (data) {
        return $http.post('/api/topics', data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var getOneTopic = function (param) {
        return $http.get('/api/topic/' + param);
    };
    var updateTopic = function (topicId, data) {
        return $http.put('/api/topic/' + topicId, data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    return {
        getByType: getByType,
        addPost: addPost,
        getOneTopic: getOneTopic,
        updateTopic: updateTopic
    };
};

function booksData($http, authentication) {
    var getBooks = function (param) {
        return $http.get('/api/books/' + param);
    }
    var getTheBook = function (param) {
        return $http.get('/api/book/' + param);
    };
    var addBook = function (data) {
        return $http.post('/api/book', data, {
            headers: {

                // 如果这个令牌被设置，为每个发出请求设置Authorization 头部，值部分使用Bearer<token>
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var removeBookById = function (bookId) {
        return $http.delete('/api/book/' + bookId, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var updateBookById = function (bookId, data) {
        return $http.put('/api/book/' + bookId, data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var uploadImage = function (data) {
        console.log(data);
        return $http.post('/api/uploadImg', data);
    };
    return {
        getBooks: getBooks,
        getTheBook: getTheBook,
        addBook: addBook,
        removeBookById: removeBookById,
        updateBookById: updateBookById,
        uploadImage: uploadImage
    };
};

function talksData($http, authentication) {
    var getTalks = function (param) {
        return $http.get('/api/talks/' + param);
    };
    var addTalk = function (data) {
        return $http.post('/api/talk', data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var removeTalkById = function (talkId) {
        return $http.delete('/api/talk/' + talkId, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var getOneTalk = function (param) {
        return $http.get('/api/talk/' + param);
    };
    return {
        getTalks: getTalks,
        addTalk: addTalk,
        removeTalkById: removeTalkById,
        getOneTalk: getOneTalk
    };
};
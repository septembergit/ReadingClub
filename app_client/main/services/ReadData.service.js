angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData)
    .service('talksData', talksData);

topicData.$inject = ['$http'];
booksData.$inject = ['$http', 'authentication'];
talksData.$inject = ['$http', 'authentication'];

function topicData($http) {
    var getByType = function (param) {
        return $http.get('/api/topics/' + param);
    }
    return {
        getByType: getByType
    };
};

function booksData($http, authentication) {
    var getBooks = $http.get('/api/books');
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
    return {
        getBooks: getBooks,
        getTheBook: getTheBook,
        addBook: addBook,
        removeBookById: removeBookById,
        updateBookById: updateBookById
    };
};

function talksData($http, authentication) {
    var getTalks = function (param) {
        return $http.get('/api/talks/' + param);
    }
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
    return {
        getTalks: getTalks,
        addTalk: addTalk,
        removeTalkById: removeTalkById
    };
};
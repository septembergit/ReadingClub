angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData)
    .service('talksData', talksData);

topicData.$inject = ['$http'];
booksData.$inject = ['$http', 'authentication'];
talksData.$inject = ['$http'];

function topicData($http) {
    var getByType = function (param) {
        return $http.get('/api/topics/ ' + param);
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
        return $http.post("/api/book", data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var removeBookById = function (bookId) {
        return $http.delete('/api/book/' + bookId, {
            Authorization: 'Bearer ' + authentication.getToken()
        });
    };
    return {
        getBooks: getBooks,
        getTheBook: getTheBook,
        addBook: addBook,
        removeBookById: removeBookById
    };
};

function talksData($http) {
    var getTalks = $http.get('/api/talks');
    var removeDisById = function (id) {

    };
    return {
        getTalks: getTalks,
        removeDisById: removeDisById
    };
};
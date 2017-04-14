angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData)
    .service('talksData', talksData);

topicData.$inject = ['$http'];
booksData.$inject = ['$http', 'authentication'];
talksData.$inject = ['$http'];

function topicData($http) {
    return $http.get('/api/topics');
};

function booksData($http, authentication) {
    var getBooks = $http.get('/api/books');
    var getbookById = function (param) {        // 查看某一本读物的详情
        $http.post('/api/books', param).success(function (data) {
            return data;
        });
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
        getbookById: getbookById,
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
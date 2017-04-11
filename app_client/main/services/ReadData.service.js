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
    var getbookById = function () {        // 查看某一本读物的详情
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
    var getTalks = function () {
        return [{
            title: '深入浅出 PHP',
            info: '朴灵 / 人民邮电出版社 / 2013-2-1 / CNY69.00',
            rating: 3,
            tags: ['node', '深入浅出']
        }, {
            title: '程序员修炼之道',
            info: '马维达',
            rating: 5,
            tags: ['程序人生', '软件开发']
        }];
    };
    var removeDisById = function (id) {

    };
    return {
        getTalks: getTalks,
        removeDisById: removeDisById
    };
};
angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData);

topicData.$inject = ['$http'];
booksData.$inject = ['$http', 'authentication'];

function topicData($http) {
    // return $http.get('/api/topics');
    return [{
        title: '《明朝那些事儿》',
        type: '书评',
        visitedCount: 2,
        commentCount: 1,
        img: '',
        author: '子不语'
    }, {
        title: '《心理罪》',
        type: '读书',
        visitedCount: 2,
        commentCount: 1,
        img: '',
        author: '吾不知'
    }];
};

function booksData($http, authentication) {
    // var getBooks = $http.get('/api/books');
    var getBooks = [{
        img: '',
        _id: 1,
        title: '深入浅出 Node.js',
        info: '朴灵 / 人民邮电出版社 / 2013-2-1 / CNY69.00',
        rating: 3,
        tags: ['node', '深入浅出']
    }, {
        img: '',
        _id: 2,
        title: '程序员修炼之道',
        info: '马维达',
        rating: 5,
        tags: ['程序人生', '软件开发']
    }];
    var getbookById = function (bookid) {
        return $http.get('/api/book/' + bookid);
    };
    var addBook = function (data) {
        return $http.post("/api/book", data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    var removeBookById = function (bookid) {
        return $http.delete('/api/book/' + bookid, {
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

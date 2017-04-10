angular
    .module('readApp')
    .service('topicData', topicData)
    .service('booksData', booksData)
    .service('talksData', talksData);

topicData.$inject = ['$http'];
booksData.$inject = ['$http', 'authentication'];
talksData.$inject = ['$http'];

function topicData($http) {
    // return $http.get('/api/topics');
    return [{
        title: '《明朝那些事儿》',
        type: '书评',
        visitedCount: 2,
        commentCount: 1,
        img: '',
        _user: '子不语'
    }, {
        title: '《心理罪》',
        type: '读书',
        visitedCount: 2,
        commentCount: 1,
        img: '',
        _user: '吾不知'
    }];
};

function booksData($http, authentication) {
    // var getBooks = $http.get('/api/books');
    var getBooks = function () {   //所有读物的展示
        return [{
            img: '',
            _id: 1111111111111111,
            title: '深入浅出 Node.js',
            info: '朴灵 / 人民邮电出版社 / 2013-2-1 / CNY69.00',
            rating: 3,
            tags: ['node', '深入浅出'],
            brief: 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
            IBSN: '',
            comments: ['不错不错', '很好的一本书']
        }, {
            img: '',
            _id: 2,
            title: '程序员修炼之道',
            info: '马维达',
            rating: 5,
            tags: ['程序人生', '软件开发']
        }];
    };
    var getbookById = function () {        // 查看某一本读物的详情
        return {
            img: '',
            _id: 1,
            title: '深入浅出 Node.js',
            info: '朴灵 / 人民邮电出版社 / 2013-2-1 / CNY69.00',
            rating: 3,
            tags: ['node', '深入浅出'],
            brief: 'nnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn',
            IBSN: '不知道IBSN是什么啊',
            comments: ['不错不错', '很好的一本书']
        };
        // $http.post('/api/books', param).success(function (data) {
        //     return data;
        // });
    };
    var addBook = function (data) {
        // return $http.post("/api/book", data, {
        //     headers: {
        //         Authorization: 'Bearer ' + authentication.getToken()
        //     }
        // });
    };
    var removeBookById = function (bookid) {
        // return $http.delete('/api/book/' + bookid, {
        //     Authorization: 'Bearer ' + authentication.getToken()
        // });
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
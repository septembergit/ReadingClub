angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
bookDetailCtrl.$inject = ['$routeParams', 'booksData'];

function bookDetailCtrl($routeParams, booksData) {
    var vm = this,
        bookId = $routeParams.bookid;
    vm.message = 'Loading...';
    vm.isComment = false;
    booksData.getbookById(bookId).success(function (data) {
        if (typeof data === 'object' && data.title === 'undefined') {
            vm.message = '暂无数据';
        } else {
            vm.message = '';
        }
        vm.oneBookInfo = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });

    vm.toComment = function () {
        vm.isComment = !vm.isComment;
    }
}
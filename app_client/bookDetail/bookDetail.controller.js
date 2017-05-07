angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
bookDetailCtrl.$inject = ['$routeParams', 'booksData', 'authentication'];

function bookDetailCtrl($routeParams, booksData, authentication) {
    var vm = this,
        theBook = $routeParams.book;
    vm.message = 'Loading...';
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.isComment = false;
    booksData.getTheBook(theBook).success(function (data) {
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
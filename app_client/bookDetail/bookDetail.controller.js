angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
bookDetailCtrl.$inject = ['$routeParams', 'booksData'];

function bookDetailCtrl($routeParams, booksData) {
    var vm = this;
    var bookid = $routeParams.bookid;
    booksData.getbookById(bookid).success(function (data) {
        vm.book = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
}
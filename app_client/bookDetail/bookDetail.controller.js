angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
bookDetailCtrl.$inject = ['$routeParams', 'booksData', 'userData'];

function bookDetailCtrl($routeParams, booksData, user) {
    var vm = this;
    vm.user = user;
    var bookid = $routeParams.bookid;
    booksData.getbookById(bookid).success(function (data) {
        vm.book = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
}
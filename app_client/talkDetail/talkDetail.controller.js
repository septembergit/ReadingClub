angular
    .module('readApp')
    .controller('talkDetailCtrl', talkDetailCtrl);
talkDetailCtrl.$inject = ['$routeParams', 'booksData'];

function talkDetailCtrl($routeParams, booksData) {
    var vm = this,
        talkId = $routeParams.bookid;
    vm.message = 'Loading...';

}
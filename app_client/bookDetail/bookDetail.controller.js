﻿angular
    .module('readApp')
    .controller('bookDetailCtrl', bookDetailCtrl);
bookDetailCtrl.$inject = ['$routeParams', 'booksData'];

function bookDetailCtrl($routeParams, booksData) {
    var vm = this,
        bookId = $routeParams.bookid;
    vm.book = booksData.getbookById();
    // vm.messagege = 'Loading...';
    // booksData.getbookById().success(function (data) {
    //     console.log(data);
    //     vm.message = data.length > 0 ? "" : "暂无数据";
    //     vm.book = data;
    // }).error(function () {
    //     vm.message = "Sorry, something's gone wrong ";
    // });
}
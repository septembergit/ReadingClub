angular
    .module('readApp')
    .controller('discussCtrl', discussCtrl);
discussCtrl.$inject = ['talksData', '$location', 'authentication'];

function discussCtrl(talksData, $location, authentication) {
    var vm = this;
    vm.talksList = talksData.getTalks();        // 测试假数据
    // vm.message = "loading...";
    // booksData.getBooks.success(function (data) {
    //     vm.message = data.length > 0 ? "" : "暂无数据";
    //     vm.books = data;
    // }).error(function () {
    //     vm.message = "Sorry, something's gone wrong ";
    // });
    vm.user = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();
}

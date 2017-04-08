angular
    .module('readApp')
    .controller('booksCtrl', booksCtrl);
booksCtrl.$inject = ['booksData', '$modal', '$location', 'authentication'];

function booksCtrl(booksData, $modal, $location, authentication) {
    var vm = this;
    vm.books = booksData.getBooks();        // 测试假数据
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

    // 新增推荐读物
    vm.popupForm = function () {
        var modalInstance = $modal.open({
            templateUrl: '../bookModal/bookModal.html',
            controller: 'bookModalCtrl as vm',
            resolve: {
                viewData: function () {
                    return {
                        title: "新增推荐",
                    };
                }
            }
        });
        modalInstance.result.then(function (data) {
            vm.books.push(data);
        });
    };

    // 删除某一个读物
    vm.removeBook = function (id) {
        if (confirm("确定删除？")) {
            booksData.removeBookById(id).success(function () {
                for (var i = 0; i < vm.books.length; i++) {
                    if (vm.books[i]._id == id) {
                        vm.books.splice(vm.books.indexOf(vm.books[i]), 1);
                    }
                }
            });
        }
    };

}

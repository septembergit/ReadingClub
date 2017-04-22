angular
    .module('readApp')
    .controller('booksCtrl', booksCtrl);
booksCtrl.$inject = ['booksData', '$modal', '$location', 'authentication', '$_uiNotify'];

function booksCtrl(booksData, $modal, $location, authentication, $_uiNotify) {
    var vm = this;
    vm.message = "loading...";
    booksData.getBooks.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.bookList = data;
        // $_uiNotify('数据展示成功！');
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
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
            vm.bookList.push(data);
        });
    };
    // 更新某一个书籍信息
    vm.updateBook = function (bookId) {

    };
    // 删除某一个读物
    vm.removeBook = function (bookId) {
        if (confirm("确定删除？")) {
            booksData.removeBookById(bookId).success(function () {
                for (var i = 0; i < vm.bookList.length; i++) {
                    if (vm.bookList[i]._id == bookId) {
                        vm.bookList.splice(vm.bookList.indexOf(vm.bookList[i]), 1);
                    }
                }
            });
        }
    };

}

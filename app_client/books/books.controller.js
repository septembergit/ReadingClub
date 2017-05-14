angular
    .module('readApp')
    .controller('booksCtrl', booksCtrl);
booksCtrl.$inject = ['booksData', '$modal', '$location', 'authentication', '$_uiNotify'];

function booksCtrl(booksData, $modal, $location, authentication, $_uiNotify) {
    var vm = this;
    vm.message = "loading...";
    booksData.getBooks('all').success(function (data) {
        vm.message = data.length > 0 ? "" : "这里空空如也~~~";
        vm.bookList = data;
        // $_uiNotify('数据展示成功！');
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
    vm.user = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();

    // 新增推荐读物
    vm.addBook = function () {
        var modalInstance = $modal.open({
            templateUrl: 'books/modal/bookModal.html',
            controller: 'bookModalCtrl as vm',
            resolve: {
                viewData: function () {
                    return {
                        title: "新增推荐"
                    };
                }
            }
        });
        modalInstance.result.then(function (data) {
            vm.bookList.push(data);
        });
    };
    // 更新某一个书籍信息
    vm.updateBook = function (book_id) {
        $modal.open({
            templateUrl: 'books/modal/bookModal.html',
            controller: 'bookModalCtrl as vm',
            resolve: {
                viewData: function () {
                    return {
                        title: "更新信息",
                        upBookId: book_id
                    };
                }
            }
        });
    };
    // 删除某一个读物
    vm.removeBook = function (book_id) {
        if (confirm("确定删除？")) {
            booksData.removeBookById(book_id).success(function () {
                for (var i = 0; i < vm.bookList.length; i++) {
                    if (vm.bookList[i]._id == book_id) {
                        vm.bookList.splice(vm.bookList.indexOf(vm.bookList[i]), 1);
                    }
                }
            });
        }
    };

    // 操作书籍的状态
    vm.handleStatus = function (book_id) {
        authentication.manageInfoList({userId: vm.user._id, bookId: book_id}).success(function () {

        }).error(function () {

        });
    };

}

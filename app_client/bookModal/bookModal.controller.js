angular
    .module('readApp')
    .controller('bookModalCtrl', bookModalCtrl);
bookModalCtrl.$inject = ['$modalInstance', 'viewData', 'booksData'];

function bookModalCtrl($modalInstance, viewData, booksData) {
    var vm = this;
    vm.viewData = viewData;
    vm.formData = {
        title: '',
        info: '',
        ISBN: '',
        tags: '',
        rating: '',
        brief: ''
    };
    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.formData.title || !vm.formData.info || !vm.formData.ISBN || !vm.formData.tags || !vm.formData.rating || !vm.formData.brief) {
            vm.formError = "请完成所有栏目!";
            return false;
        } else if (vm.viewData.upBookId) {
            vm.doUpBook(vm.formData);
        } else {
            vm.doAddBook(vm.formData);
        }
        vm.modal.cancel();
    };
    vm.doAddBook = function (params) {
        booksData.addBook({
            title: params.title,
            info: params.info,
            ISBN: params.ISBN,
            tags: params.tags,
            rating: params.rating,
            brief: params.brief
        }).success(function (data) {
            vm.modal.close(data);
        }).error(function () {
            vm.formError = "添加失败，请再试一次";
        });
        return false;
    };
    vm.doUpBook = function (params) {
        booksData.updateBookById(vm.viewData.upBookId, {
            title: params.title,
            info: params.info,
            ISBN: params.ISBN,
            tags: params.tags,
            rating: params.rating,
            brief: params.brief
        }).success(function (data) {
            vm.modal.close(data);
        }).error(function () {
            vm.formError = "更新失败，请再试一次";
        });
        return false;
    };
    vm.modal = {
        close: function (result) {
            $modalInstance.close(result);
        },
        cancel: function () {
            $modalInstance.dismiss('cancel');
        }
    };
}

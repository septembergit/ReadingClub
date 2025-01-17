﻿angular
    .module('readApp')
    .controller('bookModalCtrl', bookModalCtrl);
bookModalCtrl.$inject = ['$modalInstance', 'viewData', 'booksData'];

function bookModalCtrl($modalInstance, viewData, booksData) {
    var vm = this;
    vm.viewData = viewData;
    vm.formData = {
        title: '',
        auth: '',
        press: '',
        ISBN: '',
        tags: '',
        rating: '',
        brief: '',
        book_img: ''
    };
    vm.save = function () {
        vm.formError = "";
        if (!vm.formData.title || !vm.formData.auth || !vm.formData.press || !vm.formData.ISBN || !vm.formData.tags || !vm.formData.rating || !vm.formData.brief || !vm.formData.book_img) {
            vm.formError = "请完成必需的栏目内容!!";
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
            auth: params.auth,
            press: params.press,
            ISBN: params.ISBN,
            tags: params.tags,
            rating: params.rating,
            brief: params.brief,
            book_img: params.book_img
        }).success(function (data) {
            vm.modal.close(data);
        }).error(function () {
            vm.formError = "添加失败，请再试一次";
        });
    };
    vm.doUpBook = function (params) {
        booksData.updateBookById(vm.viewData.upBookId, {
            title: params.title,
            auth: params.auth,
            press: params.press,
            ISBN: params.ISBN,
            tags: params.tags,
            rating: params.rating,
            brief: params.brief,
            book_img: params.book_img
        }).success(function (data) {
            vm.modal.close(data);
        }).error(function () {
            vm.formError = "更新失败，请再试一次";
        });
    };
    vm.uploadImg = function () {
        booksData.uploadImage({book_img: vm.formData.book_img}).success(function () {

        }).error(function () {

        });
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

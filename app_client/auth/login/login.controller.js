﻿angular.module('readApp')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$location', 'authentication'];

// 第一步，先进行前端的验证
function loginCtrl($location, authentication) {
    var vm = this;
    vm.params = {
        email: '',
        password: ''
    };
    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.params.email || !vm.params.password) {
            vm.formError = "请输入邮箱和密码!";
            return false;
        } else {
            vm.doLogin();
        }
    };
    vm.doLogin = function () {
        vm.formError = "";
        authentication.login(vm.params).error(function (err) {
            vm.formError = err.message;
        }).then(function () {
            $location.search('page', null);
            $location.path(vm.returnPage);
        });
    };
}

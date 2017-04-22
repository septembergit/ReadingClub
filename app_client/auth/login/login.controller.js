angular.module('readApp')
    .controller('loginCtrl', loginCtrl);
loginCtrl.$inject = ['$location', 'authentication'];

// 第一步验证，前端提交之前
function loginCtrl($location, authentication) {
    var vm = this;
    vm.params = {
        email: '',
        password: ''
    };
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
        authentication.login(vm.params).error(function () {
            vm.formError = '登录出错了！';
        }).then(function () {
            $location.path('/books');
        });
    };
}

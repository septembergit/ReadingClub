angular.module('readApp')
    .controller('registerCtrl', registerCtrl);
registerCtrl.$inject = ['$location', 'authentication'];

function registerCtrl($location, authentication) {
    var vm = this;
    vm.params = {
        name: "",
        email: '',
        password: '',
        confirm_password: ''
    };
    vm.formError = "";
    vm.returnPage = $location.search().page || '/';
    vm.onSubmit = function () {
        if (!vm.params.name || !vm.params.email || !vm.params.password || !vm.params.confirm_password) {
            vm.formError = "需要填完所有字段!";
            return false;
        } else {
            vm.doRegister();
        }
    };
    vm.doRegister = function () {
        if (vm.params.password !== vm.params.confirm_password) {
            vm.formError = "两次输入的密码不相同！";
        } else {
            authentication.register(vm.params).error(function (err) {
                vm.formError = err;
            }).then(function () {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
        }
    };
}

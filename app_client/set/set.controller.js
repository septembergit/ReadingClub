angular
    .module('readApp')
    .controller('setCtrl', setCtrl);
setCtrl.$inject = ['authentication'];

function setCtrl(authentication) {
    var vm = this;
    vm.isPsw = false;
    vm.params = {
        username: '',
        per_signature: '',
        old_psw: '',
        new_psw: ''
    };
    vm.user = authentication.currentUser();
    vm.resetPsw = function () {
        vm.isPsw = !vm.isPsw;
    }
    vm.resetInfo = function () {
        authentication.resetUserInfo(vm.param).success(function () {

        });
    };
    vm.removeUser = function () {
        if (confirm("确定删除账号？")) {
            authentication.removeUser(vm.user.email).success(function () {
                console.log('账号删除成功');
            });
        }
    };
}
angular
    .module('readApp')
    .controller('setCtrl', setCtrl);
setCtrl.$inject = ['authentication'];

function setCtrl(authentication) {
    var vm = this;
    vm.isPsw = false;
    vm.user = authentication.currentUser();
    vm.params = {
        username: vm.user.name || '',
        per_signature: '',
        old_psw: '',
        new_psw: ''
    };
    vm.resetPsw = function () {
        vm.isPsw = !vm.isPsw;
    }
    vm.resetInfo = function () {
        authentication.resetUserInfo(vm.user._id, vm.params).success(function () {

            // 应该给个结果提示
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
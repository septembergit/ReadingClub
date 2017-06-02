angular
    .module('readApp')
    .controller('setCtrl', setCtrl);
setCtrl.$inject = ['authentication', '$modal'];

function setCtrl(authentication, $modal) {
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
    vm.setMoreInfo = function () {
        $modal.open({
            templateUrl: 'set/modal/setModal.html',
            controller: 'setModalCtrl as vm',
            resolve: {
                viewData: function () {
                    return {
                        userId: vm.user._id
                    };
                }
            }
        });
    };
}
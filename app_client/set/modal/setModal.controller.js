angular
    .module('readApp')
    .controller('setModalCtrl', setModalCtrl);
setModalCtrl.$inject = ['$modalInstance', 'viewData', 'authentication'];

function setModalCtrl($modalInstance, viewData, authentication) {
    var vm = this;
    vm.viewData = viewData;
    vm.param = {
        hobby: '',
        travels: '',
        brief: ''
    };
    vm.onSubmit = function () {
        vm.formError = "";
        if (!vm.param.hobby || !vm.param.travels || !vm.param.brief) {
            vm.formError = "请完成所有栏目!";
            return false;
        }
        vm.doUpdateUser(vm.param);
        vm.modal.cancel();
    };
    vm.doUpdateUser = function () {
        authentication.resetUserInfo(vm.viewData.userId, vm.param).success(function (data) {
            vm.modal.close(data);
        }).error(function () {
            vm.formError = "添加失败，请再试一次";
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

angular
    .module('readApp')
    .controller('topicModalCtrl', topicModalCtrl);
topicModalCtrl.$inject = ['topicData',  '$modalInstance', 'viewData'];

function topicModalCtrl(topicData, $modalInstance, viewData) {
    var vm = this;
    vm.viewData = viewData;
    vm.param = {
        bookTitle: '',
        radioModel: '',
        content: '',
        userName: vm.viewData.userName,
        userId: vm.viewData.userId,
    };
    vm.save = function () {
        topicData.addPost(vm.param).success(function () {

        }).error(function () {

        });
        vm.modal.cancel();
    };
    vm.selectTagFn = function (item) {
        vm.param.radioModel = item;
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

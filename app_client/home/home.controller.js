angular
    .module('readApp')
    .controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['topicData'];

function homeCtrl(topicData) {
    var vm = this;
    vm.message = "loading...";
    topicData.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.data = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
}

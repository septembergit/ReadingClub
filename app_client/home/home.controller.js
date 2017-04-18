angular
    .module('readApp')
    .controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['topicData'];

function homeCtrl(topicData) {
    var vm = this;
    vm.typeArr = ['全部', '读书', '书评', '求书', '求索'];
    vm._selected = '全部';
    vm.message = "loading...";
    topicData.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.topicList = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
    vm.selectTypeFn = function (item) {
        vm._selected = item;
    }
}

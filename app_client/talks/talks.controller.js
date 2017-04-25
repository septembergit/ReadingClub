angular
    .module('readApp')
    .controller('talksCtrl', talksCtrl);
talksCtrl.$inject = ['talksData', 'authentication'];

function talksCtrl(talksData, authentication) {
    var vm = this;
    vm.user = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.message = "loading...";
    talksData.getTalks.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.talksList = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });

    // 删除某个想说
    vm.removeTalk = function (talkId) {
        if (confirm("确定删除？")) {
            talksData.removeTalkById(talkId).success(function () {
                for (var i = 0; i < vm.talksList.length; i++) {
                    if (vm.talksList[i]._id == talkId) {
                        vm.talksList.splice(vm.talksList.indexOf(vm.talksList[i]), 1);
                    }
                }
            });
        }
    };
}

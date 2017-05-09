angular
    .module('readApp')
    .controller('talksCtrl', talksCtrl);
talksCtrl.$inject = ['talksData', 'authentication'];

function talksCtrl(talksData, authentication) {
    var vm = this;
    vm.user = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.message = "loading...";
    vm.params = {
        lift_piece: '',
        web_link: '',
        reason_txt: ''
    };
    vm.config = {
        auth_config: {
            '所有人可见': 0,
            '仅自己可见': 1
        },
        tag_config: {
            '电影': 1,
            '艺术': 2,
            '音乐': 3,
            '读书': 4,
            '时尚': 5
        }
    };
    talksData.getTalks.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.talksList = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });

    // 推荐网页
    vm.recommendWeb = function () {
        talksData.addTalk(vm.params).success(function (data) {

        }).error(function () {

        });
    };
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

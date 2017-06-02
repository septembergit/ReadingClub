angular
    .module('readApp')
    .controller('talksCtrl', talksCtrl);
talksCtrl.$inject = ['talksData', 'authentication'];

function talksCtrl(talksData, authentication) {
    var vm = this;
    vm.currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.message = "loading...";
    vm.params = {
        userName: vm.currentUser.name,
        userId: vm.currentUser._id,
        lift_piece: '',
        web_link: '',
        web_reason: '',
        diary_title: '',
        diary_content: '',
        radioModel: '',
        checkModel: [],
        type: ''
    };
    vm.tag_config = [
        {
            name: '电影',
            id: 0
        }, {
            name: '艺术',
            id: 1
        }, {
            name: '音乐',
            id: 2
        }, {
            name: '读书',
            id: 3
        }, {
            name: '时尚',
            id: 4
        }
    ];
    talksData.getTalks('all').success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.talksList = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });

    // 复选
    vm.selectTagFn = function (item) {
        var _index = vm.params.checkModel.indexOf(item.name);
        if (_index > -1) {
            vm.params.checkModel.splice(_index, 1);
        } else {
            vm.params.checkModel.push(item.name);
        }
    };

    vm.selectWhich = function (event) {
        vm.nameType = window.event.target.id;
    };

    // 发布内容
    vm.submitText = function (type) {
        vm.params.type = type;
        talksData.addTalk(vm.params).success(function () {
            vm.nameType = '';
        }).error(function () {

        });
    };

    // 取消发布
    vm.cancelSubmit = function () {
        vm.nameType = '';
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

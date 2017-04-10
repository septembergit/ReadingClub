angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['authentication'];

function personalCtrl(authentication) {
    var vm = this;
    vm.currentUser = {     // 测试假数据
        email: 'test@163.com',
        name: 'test'
    };
    vm.title = vm.currentUser.name + '的读书主页';
    // vm.currentUser = authentication.currentUser();
    vm.whichTitle = function () {
        switch (window.event.target.text) {
            case '读书主页':
                break;
            case '在读':
                vm.title = '我的在读（' + vm.currentUser.name + '）';
                break;
            case '想读':
                vm.title = '我想读的书（' + vm.currentUser.name + '）';
                break;
            case '读过':
                vm.title = '我读过的书（' + vm.currentUser.name + '）';
                break;
            case '话题':
                vm.title = '我的话题（' + vm.currentUser.name + '）';
                break;
        }
    };
}
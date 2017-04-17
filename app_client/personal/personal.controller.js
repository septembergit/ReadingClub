angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['authentication'];

function personalCtrl(authentication) {
    var vm = this;
    vm.currentUser = authentication.currentUser();
    vm.typeArr = ['在读', '想读', '读过', '话题'];
    vm._selected = '在读';
    vm.title = vm.currentUser.name + '的读书主页';
    vm.selectTypeFn = function (item) {
        vm._selected = item;
    }
}
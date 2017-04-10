angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['authentication'];

function personalCtrl(authentication){
    var vm = this;
    vm.currentUser = {     // 测试假数据
        email: 'test@163.com',
        name: 'test'
    };
    // vm.currentUser = authentication.currentUser();
}
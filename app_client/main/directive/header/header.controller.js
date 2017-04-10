angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];

function headerCtrl($location, authentication) {
    var vm = this;
    vm.currentUser = {     // 测试假数据
        email: 'test@163.com',
        name: 'test'
    };
    vm.currentPath = $location.path();
    // vm.isLoggedIn = authentication.isLoggedIn();
    // vm.currentUser = authentication.currentUser();
    vm.logout = function () {
        authentication.logout();
        $location.path('/');
    };
    vm.witchLi = function () {
    };
};
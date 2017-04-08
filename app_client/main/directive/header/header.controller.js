angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];

function headerCtrl($location, authentication) {
    var that = this;
    that.currentUser = {     // 测试假数据
        email: 'test@163.com',
        name: 'test'
    };
    that.currentPath = $location.path();
    // that.isLoggedIn = authentication.isLoggedIn();
    // that.currentUser = authentication.currentUser();
    that.logout = function () {
        authentication.logout();
        $location.path('/');
    };
    that.witchLi = function () {
    };
};
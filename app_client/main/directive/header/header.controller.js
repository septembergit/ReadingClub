angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];

function headerCtrl($location, authentication) {
    console.log(authentication);
    var that = this;
    that.currentPath = $location.path();
    that.isLoggedIn = authentication.isLoggedIn();
    that.currentUser = authentication.currentUser();
    that.logout = function () {
        authentication.logout();
        $location.path('/');
    };
    that.witchLi = function () {
    };
};
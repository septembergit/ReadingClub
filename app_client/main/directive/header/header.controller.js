angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];
function headerCtrl($location, authentication) {
    var that = this;
    that.currentPath = $location.path();

    that.isLoggedIn = authentication.isLoggedIn();
    that.currentUser = authentication.currentUser();
    that.logout = function () {
        authentication.logout();
        $location.path('/');
    };
    that.witchLi = function () {
        console.log(window.event.terget.text);
    };
};
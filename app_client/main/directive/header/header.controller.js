angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];

function headerCtrl($location, authentication) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.logout = function () {
        authentication.logout();
        $location.path('/');
    };
};
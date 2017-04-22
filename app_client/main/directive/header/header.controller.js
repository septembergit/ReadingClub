angular
    .module("readApp")
    .controller('headerCtrl', headerCtrl);
headerCtrl.$inject = ['$location', 'authentication'];

function headerCtrl($location, authentication) {
    var vm = this;
    vm.isLoggedIn = authentication.isLoggedIn();
    // vm.currentUser = authentication.currentUser();

    vm.logout = function () {
        console.log('11111111');
        authentication.logout();
        $location.path('/');
    };
};
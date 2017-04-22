angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['$routeParams', 'authentication'];

function personalCtrl($routeParams, authentication) {
    var vm = this,
        thePerson = $routeParams.personal;
    // vm.currentUser = authentication.currentUser();
    vm.typeArr = ['在读', '想读', '读过', '话题'];
    vm._selected = '在读';
    authentication.getPersoninfo(thePerson).success(function (data) {
        vm.thePersonInfo = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });

    vm.selectTypeFn = function (item) {
        vm._selected = item;
    };
}
angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['$routeParams', 'authentication', 'talksData'];

function personalCtrl($routeParams, authentication, talksData) {
    var vm = this,
        thePerson = $routeParams.personal;
    authentication.getPersoninfo(thePerson).success(function (data) {
        vm.thePersonInfo = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
    talksData.getTalks(thePerson).success(function (data) {
        vm.per_talks = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
}
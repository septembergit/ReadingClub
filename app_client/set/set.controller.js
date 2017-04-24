angular
    .module('readApp')
    .controller('setCtrl', setCtrl);
setCtrl.$inject = ['$routeParams', 'authentication'];

function setCtrl($routeParams, authentication) {
    var vm = this;
    vm.isPsw = false;
    vm.isImg = false;
    vm.resetPsw = function () {
        vm.isPsw = !vm.isPsw;
    }
    vm.resetInfo = function () {

    };
    vm.removeUser = function () {

    };
}
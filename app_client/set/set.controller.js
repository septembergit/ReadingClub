angular
    .module('readApp')
    .controller('setCtrl', setCtrl);
setCtrl.$inject = ['$routeParams', 'authentication'];

function setCtrl($routeParams, authentication) {
    var vm = this;
    vm.resetInfo = function () {

    };
    vm.removeUser = function () {

    };
}
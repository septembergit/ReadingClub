angular
    .module('readApp')
    .directive('mainHeader', function () {
        return {
            restrict: 'EA',
            templateUrl: '/main/directive/header/header.html'
        };
    });



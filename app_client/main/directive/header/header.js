(function () {
    angular
.module('readApp')
.directive('mainHeader', header);

    function header() {
        return {
            restrict: 'EA',
            templateUrl: '/main/directive/header/header.html'
        };
    }
})();
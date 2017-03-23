(function () {
    angular
.module('readApp')
.directive('headerNav', header);

    function header() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/header/header.html'
        };
    }
})();
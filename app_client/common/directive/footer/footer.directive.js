(function () {
    angular
.module('readApp')
.directive('footerNav', footerNav);
    
    function footerNav() {
        return {
            restrict: 'EA',
            templateUrl: './footer.html'
        };
    }
})();
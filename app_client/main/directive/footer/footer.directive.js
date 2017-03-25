(function () {
    angular
.module('readApp')
.directive('mainFooter', mainFooter);
    
    function mainFooter() {
        return {
            restrict: 'EA',
            templateUrl: '/main/directive/footer/footer.html'
        };
    }
})();
angular
    .module('readApp')
    .directive('mainFooter', function () {
        return {
            restrict: 'EA',
            templateUrl: '/main/directive/footer/footer.html'
        };
    });
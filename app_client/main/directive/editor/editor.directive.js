angular
    .module('readApp')
    .directive('mainEditTextarea', function () {
        return {
            restrict: 'EA',
            templateUrl: '/main/directive/editor/editor.html'
        };
    });
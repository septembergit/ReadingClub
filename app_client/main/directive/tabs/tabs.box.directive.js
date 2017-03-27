angular
    .module('readApp')
    .directive('mainTabBox', mainTabBox)
    .directive('mainTabPane', mainTabPane);

function mainTabBox() {
    return {
        restrict: 'EA',
        template: '/main/directive/tabs/tabs.box.html',
        transclude: true,
        controller: 'tabsController as vm',
        scope: {
            paneFn: '=?'
        }
    }
}
function mainTabPane() {
    return {
        transclude: true,
        require: '^mainTabBox',
        scope: {
            paneTitle: '@'
        },
        template: '<div class="tab-pane" ng-if="$ctrl.selected" ng-transclude></div>',
        link: function () {
            this.$onInit = () => this.mainTabBox.addPane(this);
        },
    }
}
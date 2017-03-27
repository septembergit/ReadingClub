angular
    .module("readApp")
    .controller('tabsController', function() {
        var panes = this.panes = [];

        this.select = (pane) => {
            panes.map((p) => p.selected = false)
            pane.selected = true;
        };

        this.clickFn = (pane) => {
            typeof this.paneFn === 'function' && this.paneFn(pane);
        };

        this.addPane = (pane) => {
            this.selected === pane.paneTitle && this.select(pane);
            panes.push(pane);
        };
    });

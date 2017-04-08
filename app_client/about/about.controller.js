angular
    .module('readApp')
    .controller('aboutCtrl', aboutCtrl);
function aboutCtrl() {
    var vm = this;
    vm.title = '<b>ReadingClub</b>';
    vm.bookList = [];
}

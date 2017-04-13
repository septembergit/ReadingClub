angular
    .module("readApp")
    .controller('editTextCtrl', editTextCtrl);

function editTextCtrl() {
    var vm = this;
    vm.textArea = '';
};
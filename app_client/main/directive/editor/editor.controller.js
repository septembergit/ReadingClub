angular
    .module("readApp")
    .controller('editTextCtrl', editTextCtrl);

function editTextCtrl() {
    var vm = this;
    vm.textArea = '';
    $(function () {
        $('.editControls a').click(function () {
            switch ($(this).data('role')) {
                case 'h1':
                case 'h2':
                case 'p':
                    document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
                    break;
                default:
                    document.execCommand($(this).data('role'), false, null);
                    break;
            }
        })
    });
};
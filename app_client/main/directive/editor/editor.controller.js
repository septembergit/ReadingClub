angular
    .module("readApp")
    .controller('editTextCtrl', editTextCtrl);
editTextCtrl.$inject = ['$routeParams', 'booksData'];

function editTextCtrl($routeParams, booksData) {
    var vm = this;
    vm.textArea = '';
    theBook = $routeParams.book;
    vm.toSubCom = function () {
        if (vm.textArea === '') {
            console.log('请填写内容');
        } else {
            booksData.updateBookById(theBook, {comment: vm.textArea}).success(function (data) {
                vm.textArea = '';
            }).error(function () {

            });
        }
    }
    // $(function () {
    //     $('.editControls a').click(function () {
    //         switch ($(this).data('role')) {
    //             case 'h1':
    //             case 'h2':
    //             case 'p':
    //                 document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
    //                 break;
    //             default:
    //                 document.execCommand($(this).data('role'), false, null);
    //                 break;
    //         }
    //     })
    // });
};
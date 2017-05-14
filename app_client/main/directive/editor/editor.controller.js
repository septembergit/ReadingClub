angular
    .module("readApp")
    .controller('editTextCtrl', editTextCtrl);
editTextCtrl.$inject = ['$routeParams', 'booksData', 'authentication'];

function editTextCtrl($routeParams, booksData, authentication) {
    var vm = this,
        theBook = $routeParams.book,
        _currentUser = authentication.currentUser();
    vm.params = {
        comment: '',
        commentUser: _currentUser.name,
        commentUserId: _currentUser._id
    }
    vm.toSubCom = function () {
        if (vm.textArea === '') {
            console.log('请填写内容');
        } else {
            booksData.updateBookById(theBook, vm.params).success(function (data) {
                vm.params.comment = '';
            }).error(function () {

            });
        }
    }
    vm.cancelSubCom = function () {
        
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
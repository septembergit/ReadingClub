angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['$routeParams', 'talksData', 'booksData'];

function personalCtrl($routeParams, talksData, booksData) {
    var vm = this,
        thePerson = $routeParams.personal;
    vm.arrWordTalks = [];
    vm.arrImgTalks = [];
    vm.arrLinkTalks = [];
    vm.arrDiaryTalks = [];
    talksData.getTalks(thePerson).success(function (data) {
        data.map(function (item) {
            switch (item.type) {
                case 'word':
                    vm.arrWordTalks.push(item);
                    break;
                case 'image':
                    vm.arrImgTalks.push(item);
                    break;
                case 'link':
                    vm.arrLinkTalks.push(item);
                    break;
                case 'diary':
                    vm.arrDiaryTalks.push(item);
                    break;
            }
        });
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
    booksData.getBooks(thePerson).success(function (data) {
        vm.myBookLength = data.length;
        vm.myBookList = data;
    }).error(function () {

    });
    booksData.getCollections(thePerson).success(function (data) {
        data.createdOn = data.createdOn.substr(0, 10);
        vm.thePersonInfo = data;
        vm.w_BookLength = data.want_book.length;
        vm.w_BookList = data.want_book;
    }).error(function () {

    });
}
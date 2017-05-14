angular
    .module('readApp')
    .controller('personalCtrl', personalCtrl);
personalCtrl.$inject = ['$routeParams', 'authentication', 'talksData', 'booksData'];

function personalCtrl($routeParams, authentication, talksData, booksData) {
    var vm = this,
        thePerson = $routeParams.personal;
    vm.arrWordTalks = [];
    vm.arrImgTalks = [];
    vm.arrLinkTalks = [];
    vm.arrDiaryTalks = [];
    authentication.getPersoninfo(thePerson).success(function (data) {
        vm.thePersonInfo = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
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
        // $_uiNotify('数据展示成功！');
    }).error(function () {

    });
}
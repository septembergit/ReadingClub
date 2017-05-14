angular
    .module('readApp')
    .controller('talkDetailCtrl', talkDetailCtrl);
talkDetailCtrl.$inject = ['$routeParams', 'talksData'];

function talkDetailCtrl($routeParams, talksData) {
    var vm = this,
        talkId = $routeParams.talkid;
    vm.message = 'Loading...';
    talksData.getOneTalk(talkId).success(function (data) {
        vm.oneTalkDate = data;
    }).error(function () {

    });
}
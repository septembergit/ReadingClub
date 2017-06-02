angular
    .module('readApp')
    .controller('topicDetailCtrl', topicDetailCtrl);
topicDetailCtrl.$inject = ['$routeParams', 'topicData', 'authentication'];

function topicDetailCtrl($routeParams, topicData, authentication) {
    var vm = this,
        topicId = $routeParams.topicId,
        currentUser = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.param = {
        comment: '',
        commentUser: currentUser.name,
        commentUserId: currentUser._id
    };
    vm.isComment = false;
    vm.message = 'Loading...';
    vm.toComment = function () {
        vm.isComment = !vm.isComment;
    };
    topicData.getOneTopic(topicId).success(function (data) {
        vm.oneTopicData = data;
        vm.message = '';
    }).error(function () {

    });
    vm.addComments = function () {
        topicData.addComments(topicId, vm.param).success(function () {
            vm.isComment = false;
        }).error(function () {

        });
    };
    vm.cancelComments = function () {
        vm.isComment = false;
    };
    vm.likeComment = function () {

    };
    vm.disLikeComment = function () {

    };
}
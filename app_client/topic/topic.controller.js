angular
    .module('readApp')
    .controller('topicCtrl', topicCtrl);
topicCtrl.$inject = ['topicData', 'authentication', '$modal'];

function topicCtrl(topicData, authentication, $modal) {
    var vm = this,
        theCurrentUser = authentication.currentUser()
    vm.typeArr = ['全部', '读书', '书评', '求书', '求索'];
    vm._selected = '全部';
    vm.message = "loading...";

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.initTopicList = function () {
        topicData.getByType(vm._selected).success(function (data) {
            vm.message = data.length > 0 ? "" : "还没有人发帖~~~";
            vm.topicList = data;
        }).error(function () {
            vm.message = "Sorry, something's gone wrong ";
        });
    };
    vm.createPost = function () {
        var modalInstance = $modal.open({
            templateUrl: 'topic/modal/topicModal.html',
            controller: 'topicModalCtrl as vm',
            resolve: {
                viewData: function () {
                    return {
                        title: "发布帖子",
                        tags: vm.typeArr,
                        userName: theCurrentUser.name,
                        userId: theCurrentUser._id,
                        userImg: theCurrentUser.user_img
                    };
                }
            }
        });
        modalInstance.result.then(function (data) {
            vm.topicList.push(data);
        });
    };

    vm.selectTypeFn = function (item) {
        vm._selected = item;
        vm.initTopicList();
    };
    vm.initTopicList();
}

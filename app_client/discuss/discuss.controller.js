﻿angular
    .module('readApp')
    .controller('discussCtrl', discussCtrl);
discussCtrl.$inject = ['talksData', '$location', 'authentication'];

function discussCtrl(talksData, $location, authentication) {
    var vm = this;
    vm.message = "loading...";
    talksData.getTalks.success(function (data) {
        vm.message = data.length > 0 ? "" : "暂无数据";
        vm.talksList = data;
    }).error(function () {
        vm.message = "Sorry, something's gone wrong ";
    });
    vm.user = authentication.currentUser();
    vm.isLoggedIn = authentication.isLoggedIn();
    vm.currentPath = $location.path();
}

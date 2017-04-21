﻿angular
    .module('readApp')
    .controller('homeCtrl', homeCtrl);
homeCtrl.$inject = ['topicData', 'booksData'];

function homeCtrl(topicData, booksData) {
    var vm = this;
    vm.typeArr = ['全部', '读书', '书评', '求书', '求索'];
    vm._selected = '全部';
    vm.message = "loading...";
    vm.initTopicList = function () {
        topicData.getByType(vm._selected).success(function (data) {
            vm.message = data.length > 0 ? "" : "暂无数据";
            vm.topicList = data;
        }).error(function () {
            vm.message = "Sorry, something's gone wrong ";
        });
    };
    vm.selectTypeFn = function (item) {
        vm._selected = item;
        vm.initTopicList();
    };
    // vm.getOneBook = function (param) {
    //     booksData.getTheBook(param).success(function (data) {
    //         vm.message = data.length > 0 ? "" : "暂无数据";
    //         vm.topicList = data;
    //     }).error(function () {
    //         vm.message = "Sorry, something's gone wrong ";
    //     });
    // };
    vm.getTheUser = function () {

    };
    vm.initTopicList();
}

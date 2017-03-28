angular.module('readApp', []);

// 定义一个服务获取数据
var getServerData = function ($http) {
    return $http.get('/api/topics');
};

//定义一个homeController
var homeController = function ($scope, getServerData) {
    $scope.message = "loading...";
    getServerData.success(function (data) {
        $scope.message = data.length > 0 ? "" : "暂无数据";
        $scope.data = data;
    }).error(function (e) {
        console.log(e);
        $scope.message = "Sorry, something's gone wrong ";
    });
};

function formdate() {
    return function (dateStr) {
        var date = new Date(dateStr),
            d = date.getDate(),
            monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            m = monthNames[date.getMonth()],
            y = date.getFullYear(),
            output = y + '-' + m + '-' + d;
        return output;
    };
};

angular.module('readApp')
    .controller('homeController', homeController)
    .filter('formdate', formdate)
    .service('getServerData', getServerData);
 

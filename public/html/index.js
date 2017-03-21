angular.module('myApp', []);

//function myController($scope) {
//    $scope.items = ["one", "two", "three"];
//};
var myController = ($scope) => {
    $scope.myInput = "Angular!";
};

angular.module('myApp').controller('myController', myController);

var app = angular.module('readApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/talks', {
            templateUrl: 'talks/talks.html',
            controller: 'talksCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/talks/:talkid', {
            templateUrl: 'talkDetail/talkDetail.html',
            controller: 'talkDetailCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/personal/:personal', {
            templateUrl: 'personal/personal.html',
            controller: 'personalCtrl',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
        })
        .when('/set/:user', {
            templateUrl: 'set/set.html',
            controller: 'setlCtrl',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
        })
        .when('/books', {
            templateUrl: 'books/books.html',
            controller: 'booksCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/book/:book', {
            templateUrl: 'bookDetail/bookDetail.html',
            controller: 'bookDetailCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/register', {
            templateUrl: '/auth/register/register.html',
            caseInsensitiveMatch: true,
            controller: 'registerCtrl',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: '/auth/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm',
            caseInsensitiveMatch: true,
        })
        .otherwise({redirectTo: '/'});    // It's the default
}
app.config(['$routeProvider', config]);
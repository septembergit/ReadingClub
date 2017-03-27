var app = angular.module('readApp', ['ngRoute', 'ngSanitize', 'ui.bootstrap']);

function config($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/about', {
            templateUrl: 'about/about.html',
            controller: 'aboutCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/books', {
            templateUrl: 'books/books.html',
            controller: 'booksCtrl',
            caseInsensitiveMatch: true,
            controllerAs: 'vm'
        })
        .when('/book/:bookid', {
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
    $locationProvider.html5Mode(true);
}
app.config(['$routeProvider', '$locationProvider', config]);
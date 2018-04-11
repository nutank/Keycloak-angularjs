angular.module('app').config(config);

config.$inject = ['$routeProvider', '$locationProvider', 'KCrouteGuard'];
function config($routeProvider, $locationProvider, KCrouteGuard) {
    $routeProvider
        .when('/home', {
            controller: 'HomeController',
            templateUrl: 'home/home.view.html',
            controllerAs: 'vm'
        })

        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'login/login.view.html',
            controllerAs: 'vm'
        })

        .when('/register', {
            controller: 'RegisterController',
            templateUrl: 'register/register.view.html',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/login' });
}
(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])    


    function initializeKeycloak() {
        var keycloakConfig = {
          "realm": "GoomoDemo",
          "url": "http://keycloakserver.ajency.in/auth",
          "ssl-required": "external",
          "clientId": "finance-portal-frontend-angularjs",
          "credentials": {
            "secret": "f8b5923c-1a36-4394-a49a-f44a2ae6596a"
          },
          "use-resource-role-mappings": true,
          "confidential-port": 0,
          "policy-enforcer": {}
        };
        
        var keycloak = Keycloak(keycloakConfig);
      
        keycloak.init({
            onLoad: 'login-required'
        }).success(function () {
            keycloak.loadUserInfo().success(function (userInfo) {

                    // angular.bootstrap(document, ['app']); 
                    bootstrapAngular(keycloak, userInfo);
                
            });
        });
    }  



    function bootstrapAngular(keycloak, userInfo) {
        angular.module('app')
            .config(config) 
            // .run(run);

            .run(['$rootScope', '$location', '$cookies', '$http', '$interval', function ($rootScope, $location, $cookies, $http, $interval) {

                var accessDenied='true';
                // keep user logged in after page refresh
                $rootScope.globals = $cookies.getObject('globals') || {};

                if(keycloak.hasResourceRole('application_access')){
                        accessDenied = 'false';
                }
                
                $rootScope.globals.currentUser = {
                    username: userInfo.name || userInfo.preferred_username,
                    roles: keycloak.realmAccess.roles,
                    accessDenied: accessDenied
                };


                if ($rootScope.globals.currentUser) {
                    $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
                }

                $rootScope.$on('$locationChangeStart', function (event, next, current) {
                    // redirect to login page if not logged in and trying to access a restricted page
                    var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
                    var loggedIn = $rootScope.globals.currentUser;
                    if (restrictedPage && !loggedIn) {
                        $location.path('/login');
                    }
                });


            }]); 


          // .run(function ($rootScope, $http, $interval, $cookies) {
          //   var updateTokenInterval = $interval(function () {
          //     // refresh token if it's valid for less then 15 minutes
          //     keycloak.updateToken(15)
          //       .success(function (refreshed) {
          //         if (refreshed) {
          //           $cookies.put('X-Authorization-Token', keycloak.token);
          //         }
          //       });
          //   }, 10000);

          //   $cookies.put('X-Authorization-Token', keycloak.token);

          //   $rootScope.userLogout = function () {
          //     $cookies.remove('X-Authorization-Token');
          //               $interval.cancel(updateTokenInterval);
          //     keycloak.logout();
          //   };

          //           $rootScope.authData = {};

          //           $http.jsonp("http://localhost:9000/test?callback=JSON_CALLBACK")
          //               .success(function (response) {
          //                   $rootScope.authData.token = response.token;
          //                   $rootScope.authData.username = response.username;
          //               });
          // });

          angular.bootstrap(document, ['app']);
    }  

    config.$inject = ['$routeProvider', '$locationProvider']; 
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
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
    

    // run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$interval'];
    // function run($rootScope, $location, $cookies, $http, $interval) {
    //     // keep user logged in after page refresh
    //     $rootScope.globals = $cookies.getObject('globals') || {};
        
    //     $rootScope.globals.currentUser = {
    //         username: userInfo.name || userInfo.preferred_username,
    //         roles: keycloak.realmAccess.roles
    //     };


    //     if ($rootScope.globals.currentUser) {
    //         $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
    //     }

    //     $rootScope.$on('$locationChangeStart', function (event, next, current) {
    //         // redirect to login page if not logged in and trying to access a restricted page
    //         var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
    //         var loggedIn = $rootScope.globals.currentUser;
    //         if (restrictedPage && !loggedIn) {
    //             $location.path('/login');
    //         }
    //     });






    // }  


    initializeKeycloak();          




       
       



    

    
    





})();

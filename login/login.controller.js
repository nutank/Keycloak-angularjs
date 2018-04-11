(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService', 'KEYCLOAKINFO'];
    function LoginController($location, AuthenticationService, FlashService, KEYCLOAKINFO) {
        var vm = this;

        vm.login = login;

        (function initController() {
            // reset login status
            AuthenticationService.ClearCredentials();
        })();

        function login() {
            vm.dataLoading = true;
            AuthenticationService.Login(vm.username, vm.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $location.path('/home');
                } else {
                    FlashService.Error(response.message);
                    vm.dataLoading = false;
                }
            });
        };

       
        function autoLogin(){

            console.log("keycloak info: ", KEYCLOAKINFO);

            vm.username = KEYCLOAKINFO.email;
            vm.password = 'xxxx';

            login();
        }

        // uncomment this after registration for auto login
        autoLogin();

    }

})();

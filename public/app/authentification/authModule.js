var authModule = angular.module('authModule', [
    'ui.router'
]);

authModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/authentification/login.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/authentification/register.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        });
    }
]);

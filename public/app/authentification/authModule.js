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
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/authentification/register.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        });
    }
]);

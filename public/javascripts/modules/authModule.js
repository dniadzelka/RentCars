var authModule = angular.module('authModule', [
    'ui.router'
]);

authModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: '/templates/auth/login.ejs',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: '/templates/auth/register.ejs',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('home');
                }
            }]
        });
    }
]);

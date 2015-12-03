angular.module('rentCarsApp').factory('auth', [
    '$http',
    '$window',
    'usSpinnerService',
    function($http, $window, usSpinnerService) {
        var auth = {};

        auth.saveToken = function (token){
            $window.localStorage['rent-cars-token'] = token;
        };

        auth.getToken = function (){
            return $window.localStorage['rent-cars-token'];
        };

        auth.isLoggedIn = function(){
            var token = auth.getToken();
            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.register = function(user){
            usSpinnerService.spin('mainSpinner');
            return $http.post('/register', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function(user){
            usSpinnerService.spin('mainSpinner');
            return $http.post('/login', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                auth.saveToken(data.token);
            });
        };

        auth.logOut = function(){
            $window.localStorage.removeItem('rent-cars-token');
        };

        return auth;
    }
]);

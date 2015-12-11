angular.module('rentCarsApp').factory('authService', [
    '$http',
    '$window',
    'usSpinnerService',
    function($http, $window, usSpinnerService) {

        var authObj = {};

        authObj.saveToken = function (token) {
            $window.localStorage['rent-cars-token'] = token;
        };

        authObj.getToken = function () {
            return $window.localStorage['rent-cars-token'];
        };

        authObj.isLoggedIn = function() {
            var token = authObj.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        authObj.currentUser = function() {
            if (authObj.isLoggedIn()) {
                var token = authObj.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        };

        authObj.register = function(user) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/register', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                authObj.saveToken(data.token);
            });
        };

        authObj.logIn = function(user) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/login', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                authObj.saveToken(data.token);
            });
        };

        authObj.logOut = function() {
            $window.localStorage.removeItem('rent-cars-token');
        };

        return authObj;
        
    }
]);

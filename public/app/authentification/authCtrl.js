angular.module('authModule').controller('authCtrl', [
    '$scope',
    '$state',
    'authService',
    'usSpinnerService',
    function($scope, $state, authService, usSpinnerService){

        $scope.user = {};

        $scope.register = function(){
            authService.register($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };

        $scope.logIn = function(){
            authService.logIn($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };
    }])

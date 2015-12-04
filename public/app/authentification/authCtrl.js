angular.module('authModule').controller('authCtrl', [
    '$scope',
    '$state',
    'auth',
    'usSpinnerService',
    function($scope, $state, auth, usSpinnerService){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };
    }])

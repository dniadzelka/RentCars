angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'auth',
    function ($scope, $location, auth) {
        $scope.navigation = {url: '/templates/navBar.ejs'};
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

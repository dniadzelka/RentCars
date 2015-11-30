angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'auth',
    function ($scope, $location, auth) {
        $scope.navigation = {url: 'app/navigationBar/navBar.html'};
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;

        $scope.doSearch = function () {
            console.log($scope.searchExpression);
        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

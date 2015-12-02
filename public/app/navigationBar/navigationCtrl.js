angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'auth',
    'doSearchService',
    '$rootScope',
    function ($scope, $location, auth, doSearchService, $rootScope) {
        $scope.navigation = {url: 'app/navigationBar/navBar.html'};
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;

        $scope.searchExpression = {};

        /* Sort orders table */
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';



        $scope.doSearch = function () {
            if ($scope.searchExpression.text === '') {
                $scope.data = null;
                $rootScope.globalSearch = false;
            }
            doSearchService($scope.searchExpression.text).success(function (data) {
                if (data) {
                    $scope.data = data;
                    $rootScope.globalSearch = true;
                }
            });
        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

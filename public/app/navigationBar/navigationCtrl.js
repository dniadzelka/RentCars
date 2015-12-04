angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'auth',
    'doSearchService',
    '$rootScope',
    'usSpinnerService',
    function ($scope, $location, auth, doSearchService, $rootScope, usSpinnerService) {
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
                return;
            }
            doSearchService($scope.searchExpression.text).then(function (data) {
                usSpinnerService.stop('mainSpinner');
                $scope.data = data.data;
                $rootScope.globalSearch = true;
            }, function (reason) {
                usSpinnerService.stop('mainSpinner');
                alert('Some error in input search!');
            });
        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

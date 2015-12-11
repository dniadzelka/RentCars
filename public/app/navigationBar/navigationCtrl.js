angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'authService',
    'doSearchService',
    '$rootScope',
    'usSpinnerService',
    function ($scope, $location, authService, doSearchService, $rootScope, usSpinnerService) {

        $rootScope.globalSearch = false;
        $scope.navigation = {url: 'app/navigationBar/navBar.html'};
        $scope.searchExpression = {};
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.currentUser = authService.currentUser;
        $scope.logOut = authService.logOut;
        $scope.data = null;

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

            doSearchService($scope.searchExpression.text).then(function (response) {
                usSpinnerService.stop('mainSpinner');
                $scope.data = response.data;
                $rootScope.globalSearch = true;
            }, function (reason) {
                usSpinnerService.stop('mainSpinner');
                console.error(reason.data);
            });

        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

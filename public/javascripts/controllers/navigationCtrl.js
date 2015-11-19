angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    'auth',
    function ($scope, auth) {
        $scope.navigation = {url: '/templates/navBar.ejs'};
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;
    }
]);

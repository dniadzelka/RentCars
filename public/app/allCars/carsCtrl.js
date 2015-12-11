angular.module('carsModule').controller('carsCtrl', [
    '$scope',
    '$location',
    'carsService',
    function ($scope, $location, carsService) {
        $scope.cars = carsService.cars;
        $scope.toAboutCarPage = function (id) {
            $location.path('/cars/aboutCar_' + id);
        }
    }
]);

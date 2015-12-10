angular.module('carsModule').controller('carsCtrl', [
    '$scope',
    '$location',
    'cars',
    function ($scope, $location, cars) {
        $scope.cars = cars.cars;
        $scope.toAboutCarPage = function (id) {
            $location.path('/cars/aboutCar_' + id);
        }
    }
]);

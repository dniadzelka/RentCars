angular.module('carsModule').controller('carsCtrl', [
    '$scope',
    'cars',
    function ($scope, cars) {
        $scope.cars = cars.cars;
    }
]);

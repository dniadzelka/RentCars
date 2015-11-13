angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    '$stateParams',
    'cars',
    function($scope, $stateParams, cars) {

        $scope.car = cars.cars[$stateParams.id];

        $scope.addOrder = function () {

            //temporary validation
            if (!$scope.from || $scope.from === '') {return;}
            if (!$scope.to || $scope.to === '') {return;}
            if (!$scope.startLocation || $scope.startLocation === '') {return;}
            if (!$scope.finishLocation || $scope.finishLocation === '') {return;}

            var obj = {
                from: $scope.from,
                to: $scope.to,
                startLocation: $scope.startLocation,
                finishLocation: $scope.finishLocation
            };

            $scope.car.orders.push(obj);
        }
    }
]);

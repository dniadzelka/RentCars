angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    'carInfo',
    'cars',
    function($scope, carInfo, cars) {

        $scope.car = carInfo;    
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

            cars.addOrder(carInfo._id, obj).success(function(data) {
                console.log(data);
                $scope.car.orders.push(data);
            });

            $scope.from = '';
            $scope.to = '';
            $scope.startLocation = '';
            $scope.finishLocation = '';

        }
    }
]);

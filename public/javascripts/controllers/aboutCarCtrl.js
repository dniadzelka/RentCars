angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    'carInfo',
    'cars',
    function($scope, carInfo, cars) {

        $scope.car = carInfo;
        $scope.from = 'ha';
        $scope.to = 'ha';

        $scope.addOrder = function () {

                            console.log($scope.from);
                            console.log($scope.to);
                            console.log($scope.startLocation);
                            console.log($scope.finishLocation);


            //temporary validation
            if (!$scope.from || $scope.from === '') {return;}
            if (!$scope.to || $scope.to === '') {return;}
            if (!$scope.startLocation || $scope.startLocation === '') {return;}
            if (!$scope.finishLocation || $scope.finishLocation === '') {return;}

            var obj = {
                from: new Date($scope.from),
                to: new Date($scope.to),
                startLocation: $scope.startLocation,
                finishLocation: $scope.finishLocation
            };



            cars.addOrder(carInfo._id, obj).success(function(data) {
                $scope.car.orders.push(data);
            });

            $scope.from = '';
            $scope.to = '';
            $scope.startLocation = '';
            $scope.finishLocation = '';

        }
    }
]);

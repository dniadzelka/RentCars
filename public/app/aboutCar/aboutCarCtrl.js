angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    'carInfo',
    'cars',
    function($scope, carInfo, cars) {

        $scope.car = carInfo;
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';

        $scope.addOrder = function () {

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

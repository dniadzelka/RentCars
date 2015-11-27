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
                finishLocation: $scope.finishLocation,
                addInfo: $scope.addInfo,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                dateBirth: new Date($scope.dateBirth),
                docNumber: $scope.docNumber,
                phoneNumber: $scope.phoneNumber
            };

            $scope.from = '';
            $scope.to = '';
            $scope.startLocation = '';
            $scope.finishLocation = '';
            $scope.addInfo = '';
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.dateBirth = '';
            $scope.docNumber = '';
            $scope.phoneNumber = '';

            cars.addOrder(carInfo._id, obj).success(function(data) {
                $scope.car.orders.push(data);

                $scope.addOrderForm.$dirty = false;
                $scope.addOrderForm.$pristine = true;
                $scope.addOrderForm.$submitted = false;
            });

        }
    }
]);

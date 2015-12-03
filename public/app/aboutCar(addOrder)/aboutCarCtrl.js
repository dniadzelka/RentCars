angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    '$location',
    'carInfo',
    'cars',
    'usSpinnerService',
    function($scope, $location, carInfo, cars, usSpinnerService) {

        $scope.car = carInfo;

        /* Sort orders table */
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';

        /* Modal pop-up */
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };

        $scope.removeCar = function (id) {
            cars.removeCar(id).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.showModal = false;
                $location.path('/cars');
            });
        }

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

            /*$scope.from = '';
            $scope.to = '';
            $scope.startLocation = '';
            $scope.finishLocation = '';
            $scope.addInfo = '';
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.dateBirth = '';
            $scope.docNumber = '';
            $scope.phoneNumber = '';*/

            cars.addOrder(carInfo._id, obj).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.car.orders.push(data);
            });

        }
    }
]);

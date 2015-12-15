angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    '$location',
    '$anchorScroll',
    'carInfo',
    'carsService',
    'usSpinnerService',
    function($scope, $location, $anchorScroll, carInfo, carsService, usSpinnerService) {

        $scope.car = carInfo;

        $scope.order = {};

        /* Sort orders table */
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';

        /* Modal pop-up */
        $scope.showModal = false;

        $scope.showAddOrderForm = false;

        $scope.goToAddOrderForm = function () {
            $scope.showAddOrderForm = true;
            $location.hash('addOrderFocus');
            $anchorScroll();
        }

        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };

        $scope.removeCar = function (id) {
            carsService.removeCar(id).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.showModal = false;
                $location.path('/cars');
            });
        }

        $scope.addOrder = function () {

            var newOrder = {
                from: new Date($scope.order.from),
                to: new Date($scope.order.to),
                startLocation: $scope.order.startLocation,
                finishLocation: $scope.order.finishLocation,
                addInfo: $scope.order.addInfo,
                firstName: angular.uppercase($scope.order.firstName),
                lastName: angular.uppercase($scope.order.lastName),
                dateBirth: new Date($scope.order.dateBirth),
                docNumber: angular.uppercase($scope.order.docNumber),
                phoneNumber: $scope.order.phoneNumber
            };

            carsService.addOrder(carInfo._id, newOrder).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.car.orders.push(data);
            });

        }
    }
]);

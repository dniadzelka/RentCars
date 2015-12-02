angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    'carInfo',

    function ($scope, cars, fileReader, carInfo) {

        $scope.car = carInfo;

        console.log($scope.car);

        /*$scope.model = $scope.car.model;
        $scope.year = $scope.car.year;
        $scope.doors = $scope.car.doors;
        $scope.airConditioner = $scope.car.airConditioner;
        $scope.autoTransmission = $scope.car.autoTransmission;
        $scope.vin = $scope.car.vin;
        $scope.price = $scope.car.price;
        $scope.imageSrc = $scope.car.image;
        $scope.orders = $scope.car.orders;*/

        $scope.max = 100;
        $scope.progress = 0;
        $scope.currentYear = new Date().getFullYear();

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
            });
        };

        $scope.$on('fileProgress', function(progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.editCar = function() {

            /*var obj = {
                model: angular.uppercase($scope.model),
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: angular.uppercase($scope.vin),
                price: $scope.price,
                image: $scope.imageSrc || '/img/noCar.png',
                orders: $scope.orders
            };*/

            cars.editCar($scope.car);
        };
    }
]);

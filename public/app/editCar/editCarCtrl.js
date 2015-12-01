angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    'carInfo',

    function ($scope, cars, fileReader, carInfo) {

        $scope.car = carInfo;

        console.log('23123');

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

            var obj = {
                model: angular.uppercase($scope.model),
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: angular.uppercase($scope.vin),
                price: $scope.price,
                image: $scope.imageSrc || '/img/noCar.png',
                orders: []
            };

            cars.create(obj);
        };
    }
]);

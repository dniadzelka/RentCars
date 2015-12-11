angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'carsService',
    'fileReader',
    function ($scope, carsService, fileReader) {
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

        $scope.addCar = function() {
            
            var newCar = {
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

            carsService.create(newCar);
        };
    }
]);

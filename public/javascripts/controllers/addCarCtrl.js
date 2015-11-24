angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    function ($scope, cars, fileReader) {

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

            var obj = {
                model: angular.uppercase($scope.model),
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: $scope.vin,
                price: $scope.price,
                image: $scope.imageSrc || '/images/noCar.png',
                orders: []
            };

            console.log(obj)

            cars.create(obj);
        };
    }
]);

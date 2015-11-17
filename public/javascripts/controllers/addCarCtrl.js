angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    function ($scope, cars, fileReader) {

        $scope.max = 100;
        $scope.progress = 0;

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
            });
        };

        $scope.$on('fileProgress', function(progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.addCar = function() {
            console.log(obj);
            $scope.airConditioner = false;
            $scope.autoTransmission = false;


            var obj = {
                model: $scope.model,
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: $scope.vin,
                price: $scope.price,
                image: $scope.imageSrc,
                orders: []
            };

            $scope.model = '';
            $scope.year = '';
            $scope.doors = '';
            $scope.airConditioner = false;
            $scope.autoTransmission = false;
            $scope.vin = '';
            $scope.price = '';
            $scope.imageSrc = '';

            console.log(obj);

            cars.create(obj);
        };
    }
]);

angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    function ($scope, cars, fileReader) {

        $scope.getFile = function () {
            $scope.progress = 0;
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
            });
        };

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.addCar = function() {

            //temporary validation
            if (!$scope.model || $scope.model === '') { return; };
            if (!$scope.year || $scope.year === '') { return; };
            if (!$scope.doors || $scope.doors === '') { return; };
            if (!$scope.price || $scope.price === '') { return; };
            if (!$scope.vin || $scope.vin === '') { return; };

            var obj = {
                model: $scope.model,
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: $scope.vin,
                price: $scope.price,
                image: 'Some img',
                orders: []
            };

            $scope.model = '';
            $scope.year = '';
            $scope.doors = '';
            $scope.airConditioner = false;
            $scope.autoTransmission = false;
            $scope.vin = '';
            $scope.price = '';

            cars.create(obj);
        };
    }
]);

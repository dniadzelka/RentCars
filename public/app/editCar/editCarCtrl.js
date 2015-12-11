angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'carsService',
    'fileReader',
    'carInfo',

    function ($scope, carsService, fileReader, carInfo) {

        $scope.car = carInfo;
        $scope.max = 100;
        $scope.progress = 100;
        $scope.currentYear = new Date().getFullYear();

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
                $scope.car.image = result;
            });
        };

        $scope.$on('fileProgress', function(progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.editCar = function() {
            carsService.editCar($scope.car._id, $scope.car);
        };
    }
]);

angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    'carInfo',

    function ($scope, cars, fileReader, carInfo) {

        $scope.car = carInfo;

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
            cars.editCar($scope.car);
        };
    }
]);

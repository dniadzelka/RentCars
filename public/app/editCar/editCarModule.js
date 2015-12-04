var editCarModule = angular.module('editCarModule', [
    'ui.router'
]);

editCarModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('editCar', {
            url: '/cars/editCar_{id}',
            templateUrl: 'app/editCar/editCar.html',
            controller: 'editCarCtrl',
            resolve : {
                carInfo: ['$stateParams', 'cars', function($stateParams, cars) {
                    return cars.getCarInfo($stateParams.id);
                }]
            }
        });
    }
]);
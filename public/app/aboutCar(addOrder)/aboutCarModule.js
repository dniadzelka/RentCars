var aboutCarModule = angular.module('aboutCarModule', [
    'ui.router'
]);

aboutCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('aboutCar', {
            url: '/cars/aboutCar_{id}',
            templateUrl: 'app/aboutCar(addOrder)/aboutCar.html',
            controller: 'aboutCarCtrl',
            resolve : {
            	carInfo: ['$stateParams', 'carsService', function($stateParams, carsService) {
            		return carsService.getCarInfo($stateParams.id);
            	}]
            }
        });
    }
]);

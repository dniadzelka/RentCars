var aboutCarModule = angular.module('aboutCarModule', [
    'angularSpinner',
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
            	carInfo: ['$stateParams', 'cars', function($stateParams, cars) {
            		return cars.getCarInfo($stateParams.id);
            	}]
            }
        });
    }
]);

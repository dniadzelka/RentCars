var aboutCarModule = angular.module('aboutCarModule', [
    'ui.router'
]);

aboutCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('aboutCar', {
            url: '/cars/aboutCar_{id}',
            templateUrl: '/templates/admin/aboutCar.ejs',
            controller: 'aboutCarCtrl',
            resolve : {
            	carInfo: ['$stateParams', 'cars', function($stateParams, cars) {
            		return cars.getCarInfo($stateParams.id);
            	}]
            }
        });
    }
]);

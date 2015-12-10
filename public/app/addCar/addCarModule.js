var addCarModule = angular.module('addCarModule', [
    'ui.router'
]);

addCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('addCar', {
            url: '/cars/addCar',
            templateUrl: 'app/addCar/addCar.html',
            controller: 'addCarCtrl'
        });
    }
]);

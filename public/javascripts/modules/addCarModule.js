var addCarModule = angular.module('addCarModule', [
    'ui.router'
]);

addCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('addCar', {
            url: '/cars/addCar',
            templateUrl: '/templates/admin/addCar.html',
            controller: 'addCarCtrl'
        });
    }
]);

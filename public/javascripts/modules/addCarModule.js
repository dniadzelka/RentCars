var addCarModule = angular.module('addCarModule', [
    'ui.router'
]);

addCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('addCar', {
            url: '/car/addCar',
            templateUrl: '/templates/admin/addCar.ejs',
            controller: 'addCarCtrl'
        });
    }
]);

var aboutCarModule = angular.module('aboutCarModule', [
    'ui.router'
]);

aboutCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('aboutCar', {
            url: '/cars/{id}',
            templateUrl: '/templates/admin/aboutCar.ejs',
            controller: 'aboutCarCtrl'
        });
    }
]);

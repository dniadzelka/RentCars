var carsModule = angular.module('carsModule', [
    'ui.router'
]);

carsModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('cars', {
            url: '/cars',
            templateUrl: '/templates/admin/cars.ejs',
            controller: 'carsCtrl',
            resolve: {
               carsPromise: ['cars', function(cars){
                   return cars.getAll();
               }]
            }         
        });
        $urlRouterProvider.otherwise('cars');
    }
]);

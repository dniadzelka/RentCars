var ordersModule = angular.module('ordersModule', [
    'ui.router'
]);

ordersModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            templateUrl: '/templates/admin/orders.html',
            //controller: 'clientsCtrl',
            resolve: {
               //clientsPromise: ['clients', function(clients){
                //    return clients.getAll();
               //}]
            }
        });
    }
]);

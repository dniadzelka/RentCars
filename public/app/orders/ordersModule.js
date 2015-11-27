var ordersModule = angular.module('ordersModule', [
    'ui.router'
]);

ordersModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            templateUrl: 'app/orders/orders.html',
            //controller: 'clientsCtrl',
            resolve: {
               //clientsPromise: ['clients', function(clients){
                //    return clients.getAll();
               //}]
            }
        });
    }
]);

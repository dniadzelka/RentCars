var ordersModule = angular.module('ordersModule', [
    'ui.router'
]);

ordersModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            templateUrl: 'app/orders/orders.html',
            resolve: {
            }
        });
    }
]);

var clientsModule = angular.module('clientsModule', [
    'ui.router'
]);

clientsModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: 'app/clients/clients.html',
            //controller: 'clientsCtrl',
            resolve: {
               //clientsPromise: ['clients', function(clients){
                //    return clients.getAll();
               //}]
            }
        });
    }
]);

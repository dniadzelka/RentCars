var clientsModule = angular.module('clientsModule', [
    'ui.router'
]);

clientsModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: '/templates/admin/clients.ejs',
            //controller: 'clientsCtrl',
            resolve: {
               //clientsPromise: ['clients', function(clients){
                //    return clients.getAll();
               //}]
            }
        });
    }
]);

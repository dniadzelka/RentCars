var clients = angular.module('clientsModule', [
    'ui.router'
]);

clients.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: 'app/clients/clients.html'
        });
    }
]);

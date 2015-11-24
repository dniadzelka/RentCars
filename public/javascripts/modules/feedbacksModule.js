var feedbacksModule = angular.module('feedbacksModule', [
    'ui.router'
]);

feedbacksModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('feedbacks', {
            url: '/feedbacks',
            templateUrl: '/templates/admin/feedbacks.ejs',
            //controller: 'clientsCtrl',
            resolve: {
               //clientsPromise: ['clients', function(clients){
                //    return clients.getAll();
               //}]
            }
        });
    }
]);

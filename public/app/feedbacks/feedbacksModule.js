var feedbacksModule = angular.module('feedbacksModule', [
    'ui.router'
]);

feedbacksModule.config([
    '$stateProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('feedbacks', {
            url: '/feedbacks',
            templateUrl: 'app/feedbacks/feedbacks.html',
            controller: 'feedbacksCtrl',
            resolve: {
                feedbacksPromise: ['feedbacks', function(feedbacks){
                    return feedbacks.getFeedbacks();
                }]
            }
        });
    }
]);

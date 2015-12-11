angular.module('feedbacksModule').factory('feedbacksService', [
    '$http',
    'usSpinnerService',
    function($http, usSpinnerService) {

        var feedbacksObj = {
            feedbacks : []
        };

        feedbacksObj.getFeedbacks = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getFeedbacks').success(function(data) {
                angular.copy(data, feedbacksObj.feedbacks);
                usSpinnerService.stop('mainSpinner');
            });
        }

        feedbacksObj.createFeedback = function (feedback) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postFeedback', feedback);
        }

        return feedbacksObj;
    }
]);

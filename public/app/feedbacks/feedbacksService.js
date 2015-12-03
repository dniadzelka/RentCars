angular.module('feedbacksModule').factory('feedbacks', [
    '$http',
    '$location',
    'usSpinnerService',
    function($http, $location, usSpinnerService) {

        var obj = {
            feedbacks : []
        };

        obj.getFeedbacks = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getFeedbacks').success(function(data) {
                angular.copy(data, obj.feedbacks);
                usSpinnerService.stop('mainSpinner');
            });
        }

        obj.createFeedback = function (feedback) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postFeedback', feedback);
        }

        obj.pushFeedback = function (data) {
            obj.feedbacks.push(data);
        }

        return obj;
    }
]);

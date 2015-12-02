angular.module('feedbacksModule').factory('feedbacks', [
    '$http',
    '$location',
    function($http, $location) {

        var obj = {
            feedbacks : []
        };

        obj.getFeedbacks = function () {
            return $http.get('/getFeedbacks').success(function(data) {
                angular.copy(data, obj.feedbacks);
            });
        }

        obj.createFeedback = function (feedback) {
            return $http.post('/postFeedback', feedback);
        }

        return obj;
    }
]);

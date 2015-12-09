angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    '$location',
    'feedbacks',
    'usSpinnerService',
    function($scope, $location, feedbacks, usSpinnerService) {
        $scope.o = {};
        $scope.feedbacks = feedbacks.feedbacks;

        /* Modal pop-up */
        $scope.showModalKeep = false;
        $scope.toggleModalKeep = function () {
            $scope.showModalKeep = !$scope.showModalKeep;
        };

        $scope.showModalGet = false;
        $scope.toggleModalGet = function (item) {
            $scope.currentFeedback = item;
            $scope.showModalGet = !$scope.showModalGet;
        };

        /* Carousel */
        $scope.myInterval = 3000;
        $scope.noWrapSlides = false;

        $scope.addFeedback = function () {
            var obj = {
                name : $scope.o.name,
                phoneNumber: $scope.o.phoneNumber,
                text: $scope.o.text,
                approved: false
            }
            feedbacks.createFeedback(obj).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                feedbacks.getFeedbacks();
                $scope.toggleModalKeep();
            });
        }
    }]
);

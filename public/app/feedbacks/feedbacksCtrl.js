angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    '$location',
    'feedbacks',
    'usSpinnerService',
    function($scope, $location, feedbacks, usSpinnerService) {

        $scope.o = {};
        $scope.feedbacks = feedbacks.feedbacks;

        /* Modal pop-up */
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };

        $scope.addFeedback = function () {
            var obj = {
                name : $scope.o.name,
                phoneNumber: $scope.o.phoneNumber,
                text: $scope.o.text,
                approved: false
            }
            feedbacks.createFeedback(obj).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                //feedbacks.getFeedbacks();
                //$scope.feedbacks = feedbacks.feedbacks;
                $scope.toggleModal();
            });
        }
    }]
);

angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    'feedbacksService',
    'usSpinnerService',
    function($scope, feedbacksService, usSpinnerService) {

        $scope.feedback = {};
        $scope.clickedFeedback = {};
        $scope.allFeedbacks = feedbacksService.feedbacks;

        /* Carousel */
        $scope.myInterval = 3000;
        $scope.noWrapSlides = false;
        $scope.itemsForSlide = 3;

        /* Modal pop-up */
        $scope.showModalKeep = false;
        $scope.showModalGet = false;

        $scope.toggleModalKeep = function () {
            $scope.showModalKeep = !$scope.showModalKeep;
        };

        $scope.toggleModalGet = function (item) {
            $scope.clickedFeedback = item;
            $scope.showModalGet = !$scope.showModalGet;
        };

        $scope.addFeedback = function () {
            var newFeedback = {
                name : $scope.feedback.name,
                phoneNumber: $scope.feedback.phoneNumber,
                text: $scope.feedback.text,
                approved: false
            }
            feedbacksService.createFeedback(newFeedback).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                feedbacksService.getFeedbacks();
                $scope.toggleModalKeep();
            });
        }
    }]
);

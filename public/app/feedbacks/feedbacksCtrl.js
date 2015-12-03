angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    'feedbacks',
    'usSpinnerService',
    function($scope, feedbacks, usSpinnerService) {

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
                feedbacks.pushFeedback(data);
                $scope.toggleModal();
            });
        }

        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;


        /*$scope.addSlide = function() {
            var newWidth = 600 + slides.length + 1;
            slides.push({
                image: '//placekitten.com/' + newWidth + '/300',
                text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 4] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
            });
        };
        for (var i = 0; i < 4; i++) {
            $scope.addSlide();
        }*/


    }]
);

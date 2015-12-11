angular.module('rentCarsApp').directive('ngPhoneHelper', [function () {
        return {
            restrict: 'A',
            link: function (scope) {

                /**
                * Directive 'ngPhoneHelper' is used to customize input form for phone numbers.
                * Apply scope to controller, when data in input changes.
                */

                var aboutCarPhoneNumber = $('#aboutCarPhoneNumber');
                var feedbackPhoneNumber = $('#feedbackPhoneNumber');

                feedbackPhoneNumber.intlTelInput();
                feedbackPhoneNumber.on('input', function(e) {
                    scope.feedback.phoneNumber = feedbackPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

                aboutCarPhoneNumber.intlTelInput();
                aboutCarPhoneNumber.on('input', function(e) {
                    scope.phoneNumber = aboutCarPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

            }
        };
}]);

angular.module('rentCarsApp').directive('ngPhoneHelper', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope) {

            var aboutCarPhoneNumber = $('#aboutCarPhoneNumber');
            aboutCarPhoneNumber.intlTelInput();
            aboutCarPhoneNumber.on('input', function(e) {
                scope.phoneNumber = aboutCarPhoneNumber.val();
                if (!scope.$$phase) scope.$apply();
            });

            var feedbackPhoneNumber = $('#feedbackPhoneNumber');
            feedbackPhoneNumber.intlTelInput();
            feedbackPhoneNumber.on('input', function(e) {
                scope.o.phoneNumber = feedbackPhoneNumber.val();
                if (!scope.$$phase) scope.$apply();
            });

        }
    };
});

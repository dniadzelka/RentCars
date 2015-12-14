angular.module('rentCarsApp').directive('ngPhoneHelper', [function () {
        return function (scope) {

            /**
            * Directive 'ngPhoneHelper' is used to customize input form for phone numbers.
            * Apply scope to controller, when data in input changes.
            */

            var phoneNumbers = $('.phoneNumber');

            phoneNumbers.intlTelInput();

            phoneNumbers.on('input', function(e) {
                scope.phoneNumber = e.target.value;
                scope.feedback.phoneNumber = e.target.value;
                if (!scope.$$phase) scope.$apply();
            });

        }

}]);

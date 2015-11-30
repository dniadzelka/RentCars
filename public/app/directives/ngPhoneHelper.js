angular.module('rentCarsApp').directive('ngPhoneHelper', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope) {

            var phoneNumberInput1 = $('#aboutCarPhoneNumber');
            phoneNumberInput1.intlTelInput();
            phoneNumberInput1.on('input', function(e) {
                scope.phoneNumber = phoneNumberInput1.val();
                if (!scope.$$phase) scope.$apply();
            });

        }
    };
});

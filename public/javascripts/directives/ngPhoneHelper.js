angular.module('rentCarsApp').directive('ngPhoneHelper', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope) {

            $("#aboutCarPhoneNumber").intlTelInput();
            
        }
    };
});

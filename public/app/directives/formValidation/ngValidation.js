angular.module('rentCarsApp').directive('ngValidation', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'form',

        /**
        * Directive 'ngValidation' binds to the form’s submit event,
        * and if the @param formController is not valid, cancels the event.
        * We will do this to display no disable buttons!
        */

        link: function (scope, elem, attributes, formController) {
            //Converts Angular expression into a function
            var fn = $parse(attributes.ngValidation);

            elem.bind('submit', function (event) {

                if (!formController.$valid)
                    return false;

                scope.$apply(function() {
                    fn(scope, { $event: event });
                });

            });
        }
    };
}]);

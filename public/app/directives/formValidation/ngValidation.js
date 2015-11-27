angular.module('rentCarsApp').directive('ngValidation', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'form',
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

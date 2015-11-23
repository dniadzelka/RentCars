angular.module('rentCarsApp').directive('ngAddCarValidation', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'form',
        link: function (scope, elem, attributes, formController) {
            var fn = $parse(attributes.ngAddCarValidation);

            elem.bind('submit', function (event) {

                if (!formController.$valid)
                    return false;

                scope.$apply(function() {
                    fn(scope, {$event:event});
                });

            });
        }
    };
}]);

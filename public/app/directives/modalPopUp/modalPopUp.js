angular.module('rentCarsApp').directive('ngModalPopUp', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/modalPopUp/modalPopUp.html',
        transclude: true,
        replace: true,
        scope: true,
        link: function(scope, element, attrs) {
            scope.title = null;
            scope.$watch(attrs.visible, function(value) {
                if (value === true) {
                    scope.title = attrs.title;
                    $(element).modal('show');
                }
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                if (!scope.$$phase) scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                 if (!scope.$$phase) scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

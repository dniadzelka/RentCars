angular.module('rentCarsApp').directive('ngModalPopUp', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/modalPopUp/modalPopUp.html',
        transclude: true,
        replace: true,
        scope: true,

        /**
        * Directive 'ngModalPopUp' activate modalWindow when @param attrs.visible equals true
        * In scope.title we pass title of modalWindow that will display in header
        * In transclude template we define body and footer of modalWindow
        */

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

            $(element).on({

                'shown.bs.modal': function () {
                    if (!scope.$$phase) scope.$apply( function () {
                        scope.$parent[attrs.visible] = true;
                    });
                },

                'hidden.bs.modal': function () {
                    if (!scope.$$phase) scope.$apply( function () {
                       scope.$parent[attrs.visible] = false;
                   });
                }

            });

        }
    };
});

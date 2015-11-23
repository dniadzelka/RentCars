angular.module('rentCarsApp').directive('ngAttemt', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
            this.attempted = false;

            this.setAttempted = function() {
                this.attempted = true;
            };
        }],

        compile: function(cElem, cAttributes, transclude) {
            return {
                pre: function(scope, formElement, attributes, attemptController) {
                    scope.attempt = scope.attempt || {};
                    scope.attempt[attributes.name] = attemptController;
                },
                post: function(scope, formElement, attributes, attemptController) {
                    formElement.bind('submit', function(event) {
                        attemptController.setAttempted();
                        if (!scope.$$phase) scope.$apply();
                    });
                }
            };
        }
    };
});

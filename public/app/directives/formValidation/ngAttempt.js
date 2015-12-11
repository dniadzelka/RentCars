angular.module('rentCarsApp').directive('ngAttempt', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {

            this.attempted = false;
            this.setAttempted = function() {
                this.attempted = true;
            };

        }],

        link: function (scope, elem, attr, ctrl) {
            var formName = attr.name;
            scope.attempt = scope.attempt || {};
            scope.attempt[formName] = ctrl;

            elem.bind('submit', function(event) {
                ctrl.setAttempted();
                //we must to check phase
                //we will have error if $apply during $digest
                if (!scope.$$phase) scope.$apply();
            });

        }
    };
});

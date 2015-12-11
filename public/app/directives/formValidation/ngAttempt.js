angular.module('rentCarsApp').directive('ngAttempt', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {

            this.attempted = false;
            this.setAttempted = function() {
                this.attempted = true;
            };

        }],

        /**
        * Directive 'ngAttempt' binds to the form’s submit event.
        * We don't want to highlight input field with error before user click submit or edit field to invali ($dirty).
        * So, we will add flag, if user use attempt to submit form.
        */

        link: function (scope, elem, attr, formController) {
            var formName = attr.name;
            scope.attempt = scope.attempt || {};
            scope.attempt[formName] = formController;

            elem.bind('submit', function(event) {
                formController.setAttempted();
                //we must to check phase
                //we will have error if $apply during $digest
                if (!scope.$$phase) scope.$apply();
            });

        }
    };
});

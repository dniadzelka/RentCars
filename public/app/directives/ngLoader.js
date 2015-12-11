angular.module('rentCarsApp').directive('loader', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            key: '@'
        },

        /**
        * Directive 'loader' activate spinner when event 'us-spinner:spin' happen,
        * and stop spinner when event 'us-spinner:stop' happen.
        */

        link: function (scope, element, attributes) {

            scope.$on('us-spinner:spin', function (event, key) {
                if (key === scope.key) {
                    element.addClass('loading');
                }
            });

            scope.$on('us-spinner:stop', function (event, key) {
                if (key === scope.key) {
                    element.removeClass('loading');
                }
            });

        },
        template: '<div class="us-spinner-wrapper"><div us-spinner spinner-key="{{key}}"></div></div>'
    };
}]);

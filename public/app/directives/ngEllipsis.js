angular.module('rentCarsApp').directive('ngEllipsis', ['$document',
    function ($document) {
        return {
            restrict: 'A',
            link: function () {

                /* Directive 'ngEllipsis' is used to customize ellipsis in overflow-text paragraph. */

                $document.ready(function() {
                	$(".feedbackTextWrapper").dotdotdot(
                        {   watch : true	}
                    );
                });
            }
        };
}]);

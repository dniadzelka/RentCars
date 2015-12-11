angular.module('feedbacksModule').filter('array', [function() {

    /**
    * Filter "array" create empty array which size depends from @param {Number} input
    * @return {Array} with size equals to nearest integer for @param {Number} input
    */

    return function (input) {
        return new Array(Math.ceil(input));
    };
}]);

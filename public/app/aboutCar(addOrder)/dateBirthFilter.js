angular.module('aboutCarModule').filter('dateBirthFormat', [function() {

    /**
    * Filter 'dateBirthFormat' formats date to 'YYYY-MM-DD' format
    */

    return function (input) {
        return moment(input).format('YYYY-MM-DD');
    };
}]);

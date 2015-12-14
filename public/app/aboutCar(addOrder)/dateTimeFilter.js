angular.module('aboutCarModule').filter('dateTimeFormat', [function() {

    /**
    * Filter 'dateTimeFormat' formats date to 'YYYY-MM-DD HH:mm' format
    */

    return function (input) {
        return moment(input).format('YYYY-MM-DD HH:mm');
    };
}]);

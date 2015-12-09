angular.module('feedbacksModule').filter('array', function() {
    function getDecimal(num) {
        var str = "" + num;
        var zeroPos = str.indexOf(".");
        if (zeroPos == -1) return 0;
        str = str.slice(zeroPos);
        return +str;
    }

    return function (input) {
        if (getDecimal(input) === 0) {
            return new Array(Math.floor(input));
        } else {
            return new Array(Math.floor(input));
        }
    };
});

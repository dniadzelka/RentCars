angular.module('rentCarsApp').factory('postDigest', [
    '$rootScope',
    '$timeout',
    /**
    * Identify an digest complete event

    * A digest cycle may have multiple $digest.
    * I $watch for the first $digest to register a $timeout which would run after the digest cycle ends.
    * I must unregister the $watch immediately to avoid multiple $timeout callbacks for one digest cycle.
    * In the $timeout callback I invoke the user callback and register a $watch for the next $digest.

    * If you want to be notified whenever $digest() is called,
    * you can register a watchExpression function with $watch() with no listener.

    * $timeout will cause another digest cycle to be executed after the function is executed.
    * If your trigger does not affect anything Angular, you can set the invokeApply argument to false to avoid running another digest cycle.

    * Identify an digest complete event
    * http://stackoverflow.com/a/21138524
    */
    function ($rootScope, $timeout) {
        function postDigest (callback) {
            var unregister = $rootScope.$watch(function() {
                unregister();
                $timeout(function() {
                    callback();
                    postDigest(callback);
                }, 0, false);
            });
        }
        return postDigest;
    }
]);

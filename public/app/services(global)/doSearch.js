angular.module('rentCarsApp').factory('doSearchService', [
    '$http',
    function ($http) {
        var getSearchResults = function (expression) {
            return $http.get('/doSearch', { params : { "expression" : expression } } );
        };
        return getSearchResults;
    }
]);

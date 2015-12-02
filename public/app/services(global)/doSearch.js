angular.module('rentCarsApp').factory('doSearchService', [
    '$http',
    function ($http) {
        var getSearchResults = function (expression) {
            return $http.get('/gerSearchResult', { params : { "expression" : expression } } );
        };
        return getSearchResults;
    }
]);

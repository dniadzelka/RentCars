angular.module('rentCarsApp').factory('doSearchService', [
    '$http',
    'usSpinnerService',
    function ($http, usSpinnerService) {
        var getSearchResults = function (expression) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/gerSearchResult', { params : { "expression" : expression } } );
        };
        return getSearchResults;
    }
]);

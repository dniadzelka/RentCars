angular.module('rentCarsApp').directive('ngFileSelect', [function() {
        return function($scope, elem) {
            /**
            * Directive 'ngFileSelect' binds to the form’s input file event,
                * and if the @param elem  changes, defines $scope.file.
            */

            elem.bind('change', function(e) {
                $scope.file = e.target.files[0];
                $scope.getFile();
            })
        }
}]);

angular.module('rentCarsApp').directive('ngFileSelect', function() {
    return {
        link: function($scope, el) {

            el.bind('change', function(e) {
                $scope.file = e.target.files[0];
                console.log($scope.file);
                $scope.getFile();
            })

        }
    }
});

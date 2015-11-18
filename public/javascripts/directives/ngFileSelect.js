angular.module('addCarModule').directive('ngFileSelect', function() {
    return {
        link: function($scope, el) {
            el.bind('change', function(e) {
                $scope.file = e.target.files[0];
                $scope.getFile();
            })

        }
    }
});

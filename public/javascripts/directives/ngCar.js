angular.module('carsModule').directive('ngCar', function () {
    return {
            resrtrict: 'A',
            templateUrl: '/templates/car.ejs',
            link: function (scope, elem, attr) {
                /*elem.bind('mouseenter', function() {
                    elem.addClass(attr.entering);
                });
                elem.bind('mouseleave', function() {
                    elem.removeClass(attr.entering);
                });*/
            }
    };
});

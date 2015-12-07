angular.module('rentCarsApp').directive('slick', ['$timeout', function($timeout) {
    return function(scope, el, attrs) {
        $timeout((function() {
            el.slick({
                arrows: true,
                dots: true,
                infinite: true,
                autoplay: true,
                autoplaySpeed: 3000,
                speed: 600,
                slidesToShow: 3,
                slidesToScroll: 3,
                fade: true
            })
        }), 100)
    }
}])

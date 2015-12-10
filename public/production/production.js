var addCarModule = angular.module('addCarModule', [
    'ui.router',
    'angularSpinner'
]);

addCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('addCar', {
            url: '/cars/addCar',
            templateUrl: 'app/addCar/addCar.html',
            controller: 'addCarCtrl'
        });
    }
]);

var carsModule = angular.module('carsModule', [
    'ui.router'
]);

carsModule.config([
    '$stateProvider',
    '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('cars', {
            url: '/cars',
            templateUrl: 'app/allCars/cars.html',
            controller: 'carsCtrl',
            resolve: {
               carsPromise: ['cars', function(cars){
                   return cars.getAll();
               }]
            }
        });

        $urlRouterProvider.otherwise('cars');
    }
]);

var rentCarsApp = angular.module('rentCarsApp', ['angularSpinner', 'carsModule', 'aboutCarModule',
												'addCarModule', 'authModule', 'editCarModule',
												'feedbacksModule', 'ordersModule', 'ui.bootstrap',
												'ngAnimate']);

/*
rentCarsApp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}
]);
*/

var authModule = angular.module('authModule', [
    'ui.router'
]);

authModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'app/authentification/login.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/authentification/register.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'auth', function($state, auth){
                if(auth.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        });
    }
]);

var aboutCarModule = angular.module('aboutCarModule', [
    'angularSpinner',
    'ui.router'
]);

aboutCarModule.config([
    '$stateProvider',
    function($stateProvider) {
        $stateProvider.state('aboutCar', {
            url: '/cars/aboutCar_{id}',
            templateUrl: 'app/aboutCar(addOrder)/aboutCar.html',
            controller: 'aboutCarCtrl',
            resolve : {
            	carInfo: ['$stateParams', 'cars', function($stateParams, cars) {
            		return cars.getCarInfo($stateParams.id);
            	}]
            }
        });
    }
]);

var editCarModule = angular.module('editCarModule', [
    'ui.router'
]);

editCarModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('editCar', {
            url: '/cars/editCar_{id}',
            templateUrl: 'app/editCar/editCar.html',
            controller: 'editCarCtrl',
            resolve : {
                carInfo: ['$stateParams', 'cars', function($stateParams, cars) {
                    return cars.getCarInfo($stateParams.id);
                }]
            }
        });
    }
]);

var feedbacksModule = angular.module('feedbacksModule', [
    'angularSpinner',
    'ui.router',
    'slick'
]);

feedbacksModule.config([
    '$stateProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('feedbacks', {
            url: '/feedbacks',
            templateUrl: 'app/feedbacks/feedbacks.html',
            controller: 'feedbacksCtrl',
            resolve: {
                feedbacksPromise: ['feedbacks', function(feedbacks){
                    return feedbacks.getFeedbacks();
                }]
            }
        });
    }
]);

var ordersModule = angular.module('ordersModule', [
    'ui.router'
]);

ordersModule.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('orders', {
            url: '/orders',
            templateUrl: 'app/orders/orders.html',
            resolve: {
            }
        });
    }
]);

angular.module('rentCarsApp').directive('loader', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            key: '@'
        },
        link: function (scope, element, attributes) {

            scope.$on('us-spinner:spin', function (event, key) {
                if (key === scope.key) {
                    element.addClass('loading');
                }
            });

            scope.$on('us-spinner:stop', function (event, key) {
                if (key === scope.key) {
                    element.removeClass('loading');
                }
            });

        },
        template: '<div class="us-spinner-wrapper"><div us-spinner spinner-key="{{key}}"></div></div>'
    };
});

angular.module('rentCarsApp').directive('ngAttempt', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {
            this.attempted = false;

            this.setAttempted = function() {
                this.attempted = true;
            };
        }],
        link: function (scope, elem, attr, ctrl) {
            var formName = attr.name;
            scope.attempt = scope.attempt || {};
            scope.attempt[formName] = ctrl;

            elem.bind('submit', function(event) {
                ctrl.setAttempted();
                //we must to check phase
                //we will have error if $apply during $digest
                if (!scope.$$phase) scope.$apply();
            });

        }
    };
});

angular.module('rentCarsApp').directive('ngValidation', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'form',
        link: function (scope, elem, attributes, formController) {
            //Converts Angular expression into a function
            var fn = $parse(attributes.ngValidation);

            elem.bind('submit', function (event) {

                if (!formController.$valid)
                    return false;

                scope.$apply(function() {
                    fn(scope, { $event: event });
                });

            });
        }
    };
}]);

angular.module('rentCarsApp').directive('ngModalPopUp', function() {
    return {
        restrict: 'E',
        templateUrl: '/app/directives/modalPopUp/modalPopUp.html',
        transclude: true,
        replace: true,
        scope: true,
        link: function(scope, element, attrs) {
            scope.title = null;
            scope.$watch(attrs.visible, function(value) {
                if (value === true) {
                    scope.title = attrs.title;
                    $(element).modal('show');
                }
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function() {
                if (!scope.$$phase) scope.$apply(function() {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function() {
                 if (!scope.$$phase) scope.$apply(function() {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

angular.module('rentCarsApp').directive('ngDatePicker',[
    '$parse',
    function ($parse) {
        return {
            restrict: 'A',
            link: function (scope) {

                    $(function () {

                    var datePickerFrom = $('#addOrderDatePickerFrom');
                    var datePickerTo = $('#addOrderDatePickerTo');
                    var datePickerBirth = $('#addOrderDatePickerBirth');

                    var inputDatePickerFrom = $('#inputAddOrderDatePickerFrom');
                    var inputDatePickerTo = $('#inputAddOrderDatePickerTo');
                    var inputDatePickerBirth = $('#inputAddOrderDatePickerBirth');

                    datePickerFrom.datetimepicker({
                        format: 'YYYY-MM-DD HH:mm',
                        minDate: moment()
                    });

                    datePickerTo.datetimepicker({
                        format: 'YYYY-MM-DD HH:mm',
                        minDate: moment().date(moment().date() + 1)
                    });
                    datePickerBirth.datetimepicker({
                        viewMode: 'years',
                        format: 'YYYY-MM-DD',
                        maxDate: moment().subtract(18, 'years'),
                        minDate: '1900-01-01 00:00'
                    });

                    datePickerFrom.on('dp.change', function (e) {
                        datePickerTo.data('DateTimePicker').minDate(e.date);
                        scope.from = e.date.format('YYYY-MM-DD HH:mm');
                    });

                    inputDatePickerFrom.on('input', function (e) {
                        scope.from = inputDatePickerFrom.val();
                    });

                    datePickerTo.on('dp.change', function (e) {
                        datePickerFrom.data('DateTimePicker').maxDate(e.date);
                        scope.to = e.date.format('YYYY-MM-DD HH:mm');
                    });

                    inputDatePickerTo.on('input', function (e) {
                        scope.to = inputDatePickerTo.val();
                    });

                    datePickerBirth.on('dp.change', function (e) {
                        scope.dateBirth = e.date.format('YYYY-MM-DD');
                    });

                    inputDatePickerBirth.on('input', function (e) {
                        scope.dateBirth = inputDatePickerBirth.val();
                    });

                });
            }
        };
}]);

angular.module('rentCarsApp').directive('ngFileSelect', function() {
    return {
        link: function($scope, el) {

            el.bind('change', function(e) {
                $scope.file = e.target.files[0];
                $scope.getFile();
            })

        }
    }
});

angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    function ($scope, cars, fileReader) {
        $scope.max = 100;
        $scope.progress = 0;
        $scope.currentYear = new Date().getFullYear();

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
            });
        };

        $scope.$on('fileProgress', function(progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.addCar = function() {

            var obj = {
                model: angular.uppercase($scope.model),
                year: $scope.year,
                doors: $scope.doors,
                airConditioner: $scope.airConditioner,
                autoTransmission: $scope.autoTransmission,
                vin: angular.uppercase($scope.vin),
                price: $scope.price,
                image: $scope.imageSrc || '/img/noCar.png',
                orders: []
            };

            cars.create(obj);
        };
    }
]);

angular.module('rentCarsApp').directive('ngPhoneHelper', [
    '$parse',
    function ($parse) {
        return {
            restrict: 'A',
            link: function (scope) {

                var aboutCarPhoneNumber = $('#aboutCarPhoneNumber');
                aboutCarPhoneNumber.intlTelInput();
                aboutCarPhoneNumber.on('input', function(e) {
                    scope.phoneNumber = aboutCarPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

                var feedbackPhoneNumber = $('#feedbackPhoneNumber');
                feedbackPhoneNumber.intlTelInput();
                feedbackPhoneNumber.on('input', function(e) {
                    scope.o.phoneNumber = feedbackPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

            }
        };
}]);

angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'cars',
    'fileReader',
    'carInfo',

    function ($scope, cars, fileReader, carInfo) {

        $scope.car = carInfo;

        $scope.max = 100;
        $scope.progress = 100;
        $scope.currentYear = new Date().getFullYear();

        $scope.getFile = function () {
            fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
                $scope.imageSrc = result;
                $scope.car.image = result;
            });
        };

        $scope.$on('fileProgress', function(progress) {
            $scope.progress = progress.loaded / progress.total;
        });

        $scope.editCar = function() {
            cars.editCar($scope.car._id, $scope.car);
        };
    }
]);

angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    '$location',
    'carInfo',
    'cars',
    'usSpinnerService',
    function($scope, $location, carInfo, cars, usSpinnerService) {

        $scope.car = carInfo;

        /* Sort orders table */
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';

        /* Modal pop-up */
        $scope.showModal = false;
        $scope.toggleModal = function () {
            $scope.showModal = !$scope.showModal;
        };

        $scope.removeCar = function (id) {
            cars.removeCar(id).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.showModal = false;
                $location.path('/cars');
            });
        }

        $scope.addOrder = function () {

            var obj = {
                from: new Date($scope.from),
                to: new Date($scope.to),
                startLocation: $scope.startLocation,
                finishLocation: $scope.finishLocation,
                addInfo: $scope.addInfo,
                firstName: $scope.firstName,
                lastName: $scope.lastName,
                dateBirth: new Date($scope.dateBirth),
                docNumber: $scope.docNumber,
                phoneNumber: $scope.phoneNumber
            };

            /*$scope.from = '';
            $scope.to = '';
            $scope.startLocation = '';
            $scope.finishLocation = '';
            $scope.addInfo = '';
            $scope.firstName = '';
            $scope.lastName = '';
            $scope.dateBirth = '';
            $scope.docNumber = '';
            $scope.phoneNumber = '';*/

            cars.addOrder(carInfo._id, obj).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.car.orders.push(data);
            });

        }
    }
]);

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
            if (Math.floor(input) === 0) {
                return new Array(1);
            } else {
                return new Array(Math.floor(input));
            }
        } else {
            return new Array(Math.floor(input) + 1);
        }
    };
});

angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    '$location',
    'feedbacks',
    'usSpinnerService',
    function($scope, $location, feedbacks, usSpinnerService) {
        $scope.o = {};
        $scope.currentFeedback = {};
        $scope.feedbacks = feedbacks.feedbacks;

        /* Modal pop-up */
        $scope.showModalKeep = false;
        $scope.toggleModalKeep = function () {
            $scope.showModalKeep = !$scope.showModalKeep;
        };

        $scope.showModalGet = false;
        $scope.toggleModalGet = function (item) {
            $scope.currentFeedback = item;
            $scope.showModalGet = !$scope.showModalGet;
        };

        /* Carousel */
        $scope.myInterval = 3000;
        $scope.noWrapSlides = false;

        $scope.addFeedback = function () {
            var obj = {
                name : $scope.o.name,
                phoneNumber: $scope.o.phoneNumber,
                text: $scope.o.text,
                approved: false
            }
            feedbacks.createFeedback(obj).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                feedbacks.getFeedbacks();
                $scope.toggleModalKeep();
            });
        }
    }]
);

angular.module('authModule').controller('authCtrl', [
    '$scope',
    '$state',
    'auth',
    'usSpinnerService',
    function($scope, $state, auth, usSpinnerService){
        $scope.user = {};

        $scope.register = function(){
            auth.register($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };

        $scope.logIn = function(){
            auth.logIn($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };
    }])

angular.module('feedbacksModule').factory('feedbacks', [
    '$http',
    'usSpinnerService',
    function($http, usSpinnerService) {

        var obj = {
            feedbacks : []
        };

        obj.getFeedbacks = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getFeedbacks').success(function(data) {
                angular.copy(data, obj.feedbacks);
                usSpinnerService.stop('mainSpinner');
            });
        }

        obj.createFeedback = function (feedback) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postFeedback', feedback);
        }

        return obj;
    }
]);

angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'auth',
    'doSearchService',
    '$rootScope',
    'usSpinnerService',
    function ($scope, $location, auth, doSearchService, $rootScope, usSpinnerService) {
        $scope.navigation = {url: 'app/navigationBar/navBar.html'};
        $scope.isLoggedIn = auth.isLoggedIn;
        $scope.currentUser = auth.currentUser;
        $scope.logOut = auth.logOut;

        $scope.searchExpression = {};

        /* Sort orders table */
        $scope.sortType = 'from';
        $scope.sortReverse = false;
        $scope.searchOrders = '';

        $scope.doSearch = function () {
            if ($scope.searchExpression.text === '') {
                $scope.data = null;
                $rootScope.globalSearch = false;
                return;
            }
            doSearchService($scope.searchExpression.text).then(function (data) {
                usSpinnerService.stop('mainSpinner');
                $scope.data = data.data;
                $rootScope.globalSearch = true;
            }, function (reason) {
                usSpinnerService.stop('mainSpinner');
                alert('Some error in input search!');
            });
        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

angular.module('carsModule').controller('carsCtrl', [
    '$scope',
    'cars',
    function ($scope, cars) {
        $scope.cars = cars.cars;
    }
]);

angular.module('rentCarsApp').factory('auth', [
    '$http',
    '$window',
    'usSpinnerService',
    function($http, $window, usSpinnerService) {
        var auth = {};

        auth.saveToken = function (token){
            $window.localStorage['rent-cars-token'] = token;
        };

        auth.getToken = function (){
            return $window.localStorage['rent-cars-token'];
        };

        auth.isLoggedIn = function(){
            var token = auth.getToken();
            if(token){
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        auth.currentUser = function(){
            if(auth.isLoggedIn()){
                var token = auth.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));

                return payload.username;
            }
        };

        auth.register = function(user){
            usSpinnerService.spin('mainSpinner');
            return $http.post('/register', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                auth.saveToken(data.token);
            });
        };

        auth.logIn = function(user){
            usSpinnerService.spin('mainSpinner');
            return $http.post('/login', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                auth.saveToken(data.token);
            });
        };

        auth.logOut = function(){
            $window.localStorage.removeItem('rent-cars-token');
        };

        return auth;
    }
]);

angular.module('rentCarsApp').factory('cars', [
    '$http',
    '$location',
    'auth',
    'usSpinnerService',
    function($http, $location, auth, usSpinnerService) {

        var obj = {
            cars: []
        };

        obj.getAll = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getAllcars').success(function(data) {
                usSpinnerService.stop('mainSpinner');
                angular.copy(data, obj.cars);
            });
        };

        obj.create = function (car) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postCar', car).success(function(data){
                usSpinnerService.stop('mainSpinner');
                $location.path('/cars');
            });
        };

        obj.editCar = function (id, car) {
            usSpinnerService.spin('mainSpinner');
            return $http.put('/editCar_' + id, car).success(function(data){
                usSpinnerService.stop('mainSpinner');
                $location.path('/cars');
            });
        };

        obj.getCarInfo = function (id) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/allcars/getCar_' + id).then(function(res) {
                usSpinnerService.stop('mainSpinner');
                return res.data;
            });
        };

        obj.addOrder = function (id, order) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/allcars/' + id + '/allorders', order);
        }

        obj.removeCar = function (id) {
            usSpinnerService.spin('mainSpinner');
            return $http.delete('/allcars/deleteCar_' + id);
        }

        return obj;
    }
]);

angular.module('rentCarsApp').factory('doSearchService', [
    '$http',
    'usSpinnerService',
    function ($http, usSpinnerService) {
        var getSearchResults = function (expression) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getSearchResult', { params : { "expression" : expression } } );
        };
        return getSearchResults;
    }
]);

angular.module('rentCarsApp').factory('fileReader', [
    '$q',
    '$log',
    function($q, $log) {

        var onLoad = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
                    deferred.reject(reader.result);
                });
            };
        };

        var onProgress = function(reader, scope) {
            return function(event) {
                scope.$broadcast('fileProgress', {
                    total: event.total,
                    loaded: event.loaded
                });
            };
        };

        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            reader.onprogress = onProgress(reader, scope);
            return reader;
        };

        var readAsDataURL = function(file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    }
]);

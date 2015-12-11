var addCarModule = angular.module('addCarModule', [
    'ui.router'
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
               carsPromise: ['carsService', function(carsService){
                   return carsService.getAll();
               }]
            }
        });

        $urlRouterProvider.otherwise('cars');
    }
]);

var rentCarsApp = angular.module('rentCarsApp', ['angularSpinner', 'carsModule', 'aboutCarModule',
												'addCarModule', 'authModule', 'editCarModule',
												'feedbacksModule', 'clientsModule', 'ui.bootstrap',
												'ngAnimate']);


/*rentCarsApp.config(['$locationProvider', function($locationProvider) {
		$locationProvider.html5Mode(true);
	}
]);*/

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
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        })
        .state('register', {
            url: '/register',
            templateUrl: 'app/authentification/register.html',
            controller: 'authCtrl',
            onEnter: ['$state', 'authService', function($state, authService){
                if(authService.isLoggedIn()){
                    $state.go('cars');
                }
            }]
        });
    }
]);

var aboutCarModule = angular.module('aboutCarModule', [
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
            	carInfo: ['$stateParams', 'carsService', function($stateParams, carsService) {
            		return carsService.getCarInfo($stateParams.id);
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
                carInfo: ['$stateParams', 'carsService', function($stateParams, carsService) {
                    return carsService.getCarInfo($stateParams.id);
                }]
            }
        });
    }
]);

var feedbacksModule = angular.module('feedbacksModule', [
    'ui.router'
]);

feedbacksModule.config([
    '$stateProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('feedbacks', {
            url: '/feedbacks',
            templateUrl: 'app/feedbacks/feedbacks.html',
            controller: 'feedbacksCtrl',
            resolve: {
                feedbacksPromise: ['feedbacksService', function(feedbacksService){
                    return feedbacksService.getFeedbacks();
                }]
            }
        });
    }
]);

angular.module('rentCarsApp').directive('ngEllipsis', ['$document',
    function ($document) {
        return {
            restrict: 'A',
            link: function () {

                /* Directive 'ngEllipsis' is used to customize ellipsis in overflow-text paragraph. */

                $document.ready(function() {
                	$(".feedbackTextWrapper").dotdotdot(
                        {   watch : true	}
                    );
                });
            }
        };
}]);

angular.module('carsModule').controller('carsCtrl', [
    '$scope',
    '$location',
    'carsService',
    function ($scope, $location, carsService) {
        $scope.cars = carsService.cars;
        $scope.toAboutCarPage = function (id) {
            $location.path('/cars/aboutCar_' + id);
        }
    }
]);

var clients = angular.module('clientsModule', [
    'ui.router'
]);

clients.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('clients', {
            url: '/clients',
            templateUrl: 'app/clients/clients.html'
        });
    }
]);

angular.module('rentCarsApp').directive('ngAttempt', function() {
    return {
        restrict: 'A',
        controller: ['$scope', function($scope) {

            this.attempted = false;
            this.setAttempted = function() {
                this.attempted = true;
            };

        }],

        /**
        * Directive 'ngAttempt' binds to the form’s submit event.
        * We don't want to highlight input field with error before user click submit or edit field to invali ($dirty).
        * So, we will add flag, if user use attempt to submit form.
        */

        link: function (scope, elem, attr, formController) {
            var formName = attr.name;
            scope.attempt = scope.attempt || {};
            scope.attempt[formName] = formController;

            elem.bind('submit', function(event) {
                formController.setAttempted();
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

        /**
        * Directive 'ngValidation' binds to the form’s submit event,
        * and if the @param formController is not valid, cancels the event.
        * We will do this to display no disable buttons!
        */

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

        /**
        * Directive 'ngModalPopUp' activate modalWindow when @param attrs.visible equals true
        * In scope.title we pass title of modalWindow that will display in header
        * In transclude template we define body and footer of modalWindow
        */

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

angular.module('rentCarsApp').directive('ngDatePicker',[function () {
        return {
            restrict: 'A',
            link: function (scope) {
                    $(function () {

                        /**
                        * Directive 'ngDatePicker' is used to customize input form for dates.
                        * Apply scope to controller, when data in input changes.
                        */

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

angular.module('addCarModule').controller('addCarCtrl', [
    '$scope',
    'carsService',
    'fileReader',
    function ($scope, carsService, fileReader) {
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
            
            var newCar = {
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

            carsService.create(newCar);
        };
    }
]);

angular.module('rentCarsApp').directive('ngFileSelect', [function() {
    return {
        link: function($scope, elem) {

            /**
            * Directive 'ngFileSelect' binds to the form’s input file event,
            * and if the @param elem  changes, defines $scope.file.
            */

            elem.bind('change', function(e) {
                $scope.file = e.target.files[0];
                $scope.getFile();
            })
        }
    }
}]);

angular.module('rentCarsApp').directive('loader', [function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            key: '@'
        },

        /**
        * Directive 'loader' activate spinner when event 'us-spinner:spin' happen,
        * and stop spinner when event 'us-spinner:stop' happen.
        */

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
}]);

angular.module('rentCarsApp').directive('ngPhoneHelper', [function () {
        return {
            restrict: 'A',
            link: function (scope) {

                /**
                * Directive 'ngPhoneHelper' is used to customize input form for phone numbers.
                * Apply scope to controller, when data in input changes.
                */

                var aboutCarPhoneNumber = $('#aboutCarPhoneNumber');
                var feedbackPhoneNumber = $('#feedbackPhoneNumber');

                feedbackPhoneNumber.intlTelInput();
                feedbackPhoneNumber.on('input', function(e) {
                    scope.feedback.phoneNumber = feedbackPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

                aboutCarPhoneNumber.intlTelInput();
                aboutCarPhoneNumber.on('input', function(e) {
                    scope.phoneNumber = aboutCarPhoneNumber.val();
                    if (!scope.$$phase) scope.$apply();
                });

            }
        };
}]);

angular.module('editCarModule').controller('editCarCtrl', [
    '$scope',
    'carsService',
    'fileReader',
    'carInfo',

    function ($scope, carsService, fileReader, carInfo) {

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
            carsService.editCar($scope.car._id, $scope.car);
        };
    }
]);

angular.module('aboutCarModule').controller('aboutCarCtrl', [
    '$scope',
    '$location',
    'carInfo',
    'carsService',
    'usSpinnerService',
    function($scope, $location, carInfo, carsService, usSpinnerService) {

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
            carsService.removeCar(id).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.showModal = false;
                $location.path('/cars');
            });
        }

        $scope.addOrder = function () {

            var newOrder = {
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

            carsService.addOrder(carInfo._id, newOrder).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                $scope.car.orders.push(data);
            });

        }
    }
]);

angular.module('feedbacksModule').filter('array', [function() {

    /**
    * Filter 'array' create empty array which size depends from @param {Number} input
    * @return {Array} with size equals to nearest integer for @param {Number} input
    */

    return function (input) {
        return new Array(Math.ceil(input));
    };
    
}]);

angular.module('feedbacksModule').controller('feedbacksCtrl', [
    '$scope',
    'feedbacksService',
    'usSpinnerService',
    function($scope, feedbacksService, usSpinnerService) {

        $scope.feedback = {};
        $scope.clickedFeedback = {};
        $scope.allFeedbacks = feedbacksService.feedbacks;

        /* Carousel */
        $scope.myInterval = 3000;
        $scope.noWrapSlides = false;
        $scope.itemsForSlide = 3;

        /* Modal pop-up */
        $scope.showModalKeep = false;
        $scope.showModalGet = false;

        $scope.toggleModalKeep = function () {
            $scope.showModalKeep = !$scope.showModalKeep;
        };

        $scope.toggleModalGet = function (item) {
            $scope.clickedFeedback = item;
            $scope.showModalGet = !$scope.showModalGet;
        };

        $scope.addFeedback = function () {
            var newFeedback = {
                name : $scope.feedback.name,
                phoneNumber: $scope.feedback.phoneNumber,
                text: $scope.feedback.text,
                approved: false
            }
            feedbacksService.createFeedback(newFeedback).success(function(data) {
                usSpinnerService.stop('mainSpinner');
                feedbacksService.getFeedbacks();
                $scope.toggleModalKeep();
            });
        }
    }]
);

angular.module('authModule').controller('authCtrl', [
    '$scope',
    '$state',
    'authService',
    'usSpinnerService',
    function($scope, $state, authService, usSpinnerService){

        $scope.user = {};

        $scope.register = function(){
            authService.register($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };

        $scope.logIn = function(){
            authService.logIn($scope.user).error(function(error){
                usSpinnerService.stop('mainSpinner');
                $scope.error = error;
            }).then(function(){
                $state.go('cars');
            });
        };
    }])

angular.module('feedbacksModule').factory('feedbacksService', [
    '$http',
    'usSpinnerService',
    function($http, usSpinnerService) {

        var feedbacksObj = {
            feedbacks : []
        };

        feedbacksObj.getFeedbacks = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getFeedbacks').success(function(data) {
                angular.copy(data, feedbacksObj.feedbacks);
                usSpinnerService.stop('mainSpinner');
            });
        }

        feedbacksObj.createFeedback = function (feedback) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postFeedback', feedback);
        }

        return feedbacksObj;
    }
]);

angular.module('rentCarsApp').controller('navigationCtrl', [
    '$scope',
    '$location',
    'authService',
    'doSearchService',
    '$rootScope',
    'usSpinnerService',
    function ($scope, $location, authService, doSearchService, $rootScope, usSpinnerService) {

        $rootScope.globalSearch = false;
        $scope.navigation = {url: 'app/navigationBar/navBar.html'};
        $scope.searchExpression = {};
        $scope.isLoggedIn = authService.isLoggedIn;
        $scope.currentUser = authService.currentUser;
        $scope.logOut = authService.logOut;
        $scope.data = null;

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

            doSearchService($scope.searchExpression.text).then(function (response) {
                usSpinnerService.stop('mainSpinner');
                $scope.data = response.data;
                $rootScope.globalSearch = true;
            }, function (reason) {
                usSpinnerService.stop('mainSpinner');
                console.error(reason.data);
            });

        }

        $scope.isActive = function (viewLocation) {
            var result = (viewLocation === $location.path());
            return result;
        };

    }
]);

angular.module('rentCarsApp').factory('authService', [
    '$http',
    '$window',
    'usSpinnerService',
    function($http, $window, usSpinnerService) {

        var authObj = {};

        authObj.saveToken = function (token) {
            $window.localStorage['rent-cars-token'] = token;
        };

        authObj.getToken = function () {
            return $window.localStorage['rent-cars-token'];
        };

        authObj.isLoggedIn = function() {
            var token = authObj.getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };

        authObj.currentUser = function() {
            if (authObj.isLoggedIn()) {
                var token = authObj.getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.username;
            }
        };

        authObj.register = function(user) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/register', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                authObj.saveToken(data.token);
            });
        };

        authObj.logIn = function(user) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/login', user).success(function(data){
                usSpinnerService.stop('mainSpinner');
                authObj.saveToken(data.token);
            });
        };

        authObj.logOut = function() {
            $window.localStorage.removeItem('rent-cars-token');
        };

        return authObj;
        
    }
]);

angular.module('rentCarsApp').factory('carsService', [
    '$http',
    '$location',
    'usSpinnerService',
    function($http, $location, usSpinnerService) {

        var carsObj = {
            cars: []
        };

        carsObj.getAll = function () {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getAllcars').success(function(data) {
                usSpinnerService.stop('mainSpinner');
                angular.copy(data, carsObj.cars);
            });
        };

        carsObj.create = function (car) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/postCar', car).success(function(data){
                usSpinnerService.stop('mainSpinner');
                $location.path('/cars');
            });
        };

        carsObj.editCar = function (id, car) {
            usSpinnerService.spin('mainSpinner');
            return $http.put('/editCar_' + id, car).success(function(data){
                usSpinnerService.stop('mainSpinner');
                $location.path('/cars');
            });
        };

        carsObj.getCarInfo = function (id) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/allcars/getCar_' + id).then(function(response) {
                usSpinnerService.stop('mainSpinner');
                return response.data;
            });
        };

        carsObj.addOrder = function (id, order) {
            usSpinnerService.spin('mainSpinner');
            return $http.post('/allcars/' + id + '/allorders', order);
        }

        carsObj.removeCar = function (id) {
            usSpinnerService.spin('mainSpinner');
            return $http.delete('/allcars/deleteCar_' + id);
        }

        return carsObj;

    }
]);

angular.module('rentCarsApp').factory('doSearchService', [
    '$http',
    'usSpinnerService',
    function ($http, usSpinnerService) {
        var getSearchResults = function (expression) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/getSearchResult', { params : { 'expression' : expression } } );
        };
        return getSearchResults;
    }
]);

angular.module('rentCarsApp').factory('fileReader', [
    '$q',
    function($q) {

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

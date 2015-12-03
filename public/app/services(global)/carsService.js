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

        obj.editCar = function (car) {
            usSpinnerService.spin('mainSpinner');
            return $http.put('/editCar', car).success(function(data){
                usSpinnerService.stop('mainSpinner');
                $location.path('/cars');
            });
        };

        obj.getCarInfo = function (id) {
            usSpinnerService.spin('mainSpinner');
            return $http.get('/allcars/' + id).then(function(res) {
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
            return $http.delete('/allcars/' + id);
        }

        return obj;
    }
]);

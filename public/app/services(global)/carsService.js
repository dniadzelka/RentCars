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

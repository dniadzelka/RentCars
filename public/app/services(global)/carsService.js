angular.module('rentCarsApp').factory('cars', [
    '$http',
    '$location',
    'auth',
    function($http, $location, auth) {

        var obj = {
            cars: []
        };

        obj.getAll = function () {
            return $http.get('/getAllcars').success(function(data) {
                angular.copy(data, obj.cars);
            });
        };

        obj.create = function (car) {
            return $http.post('/postCar', car).success(function(data){
                $location.path('/cars');
            });
        };

        obj.getCarInfo = function (id) {
            return $http.get('/allcars/' + id).then(function(res) {
                return res.data;
            });
        };

        obj.addOrder = function (id, order) {
            return $http.post('/allcars/' + id + '/allorders', order);
        }

        obj.removeCar = function (id) {
            return $http.delete('/allcars/' + id);
        }

        return obj;
    }
]);

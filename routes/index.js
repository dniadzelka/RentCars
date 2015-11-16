var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Car = mongoose.model('Car');
var Order = mongoose.model('Order');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/allcars', function(req, res, next) {
    Car.find(function(err, cars) {
        if (err) {
            return next(err);
        }

        res.json(cars);
    });
});

router.post('/allcars', function(req, res, next) {
    console.log(req.body);
    var car = new Car(req.body);

    car.save(function(err, car) {
        if (err) {
            return next(err);
        }

        res.json(car);
    });
});

router.param('car', function(req, res, next, id) {
    var query = Car.findById(id);

    query.exec(function(err, car) {
        if (err) {
            return next(err);
        }
        if (!car) {
            return next(new Error('can\'t find car'));
        }

        req.car = car;
        return next();
    });
});

router.get('/allcars/:car', function(req, res) {
    //load all comments associated with car
    req.car.populate('orders', function(err, car) {
        if (err) { return next(err); }
        res.json(car);
    });
});

router.post('/allcars/:car/allorders', function(req, res, next) {
    var order = new Order(req.body);
    //reference from order to car
    order.car = req.car;

    order.save(function(err, order){

        if(err){ return next(err); }

        // because ref to car !!!
        req.car.orders.push(order);
        req.car.save(function(err, car) {
            if(err){ return next(err); }
            res.json(order);
        });
    });
});

module.exports = router;

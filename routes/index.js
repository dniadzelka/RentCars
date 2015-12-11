var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Car = mongoose.model('Car');
var Order = mongoose.model('Order');
var User = mongoose.model('User');
var Feedback = mongoose.model('Feedback');

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


router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/getAllcars', function(req, res, next) {
    Car.find(function(err, cars) {
        if (err) {
            return next(err);
        }
        res.json(cars);
    });
});

router.get('/getFeedbacks', function(req, res, next) {
    Feedback.find(function(err, feedbacks) {
        if (err) {
            return next(err);
        }
        res.json(feedbacks);
    });
});

router.get('/getSearchResult', function(req, res, next) {

    var reg = new RegExp(req.query.expression, 'i');

    Order.find().or([
        { startLocation : reg},
        { finishLocation : reg},
        { addInfo : reg},
        { firstName : reg},
        { lastName : reg },
        { docNumber: reg },
        { phoneNumber : reg}
    ]).exec(function(err, q) {
        if (err) {
            return next(err);
        }
        res.json(q);
    });
});

router.get('/allcars/getCar_:car', function(req, res, next) {
    //load all comments associated with car
    req.car.populate('orders', function(err, car) {
        if (err) {
            return next(err);
        }
        res.json(car);
    });
});

router.post('/postCar', function(req, res, next) {
    var car = new Car(req.body);
    car.save(function (err, car) {
        if (err) {
            return next(err);
        }
        res.json(car);
    });
});

router.post('/postFeedback', function(req, res, next) {
    var feedback = new Feedback(req.body);
    feedback.save(function (err, feedback) {
        if (err) {
            return next(err);
        }
        res.json(feedback);
    });
});

router.post('/allcars/:car/allorders', function(req, res, next) {
    var order = new Order(req.body);
    //reference from order to car
    order.car = req.car;

    order.save(function(err, order) {

        if (err) {
            return next(err);
        }

        // because ref to car !!!
        req.car.orders.push(order);
        req.car.save(function(err, car) {
            if (err) {
                return next(err);
            }
            res.json(order);
        });
    });
});

router.put('/editCar_:car', function(req, res, next) {
    var id = req.params.car;
    var query = { '_id' : id };
    Car.findOneAndUpdate(query, req.body, { upsert : true }, function (err, doc) {
        if (err) {
            return next(err);
        }
        return res.send(req.body);
    });
});

router.delete('/allcars/deleteCar_:car', function(req, res, next) {
    var id = req.params.car;
    Car.remove({ _id: id }, function(err) {
        if (err) return next(err);
        return res.json({ _id: id });
    });
});

/* ------------------AUTHENTIFICATION--------------------------- */

router.post('/register', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password)

    User.find({username : user.username}, function (err, docs) {
        if (docs.length) {
            var errorMessage = 'User "' + user.username + '" is already exist!';
            return res.status(409).json({
                message: errorMessage
            });
        } else {
            user.save(function(err) {
                if (err) {
                    return next(err);
                }

                return res.json({
                    token: user.generateJWT()
                })
            });
        }
    });
});

router.post('/login', function(req, res, next) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({
            message: 'Please fill out all fields'
        });
    }

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            return res.json({
                token: user.generateJWT()
            });
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

module.exports = router;

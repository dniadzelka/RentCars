angular.module('rentCarsApp').factory('cars', [function() {

        //data to test




        return {
            cars: [{
                model: 'Reno',
                year: 2008,
                doors: 4,
                airConditioner: true,
                autoTransmission: true,
                vin: 'KNADE243896438954',
                price: 35,
                image: 'Some img',
                orders: [
                    {
                        from: '2015-02-10T11:00',
                        to: '2015-02-15T23:30',
                        startLocation: 'office',
                        finishLocation: 'airport'
                    },
                    {
                        from: '2015-10-28T12:30',
                        to: '2015-10-29T23:30',
                        startLocation: 'airport',
                        finishLocation: 'airport'
                    },
                ]
            }]
        };
    }
]);

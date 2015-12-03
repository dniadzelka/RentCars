module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                src: [
                    //'public/libs/*.js',
                    //'public/libs/carosel/*.js',
                    'public/app/aboutCar(addOrder)/*.js',
                    'public/app/addCar/*.js',
                    'public/app/allCars/*.js',
                    'public/app/authentification/*.js',
                    'public/app/directives/*.js',
                    'public/app/directives/formValidation/*.js',
                    'public/app/directives/modalPopUp/*.js',
                    'public/app/editCar/*.js',
                    'public/app/feedbacks/*.js',
                    'public/app/navigationBar/*.js',
                    'public/app/orders/*.js',
                    'public/app/services(global)/*.js',
                    'public/app/*.js'
                ],
                dest: 'public/production/production.js'
            },

            css: {
                src: [
                    'public/libs/*.css',
                    'public/libs/carosel/*.css',
                    'public/app/aboutCar(addOrder)/*.css',
                    'public/app/addCar/*.css',
                    'public/app/allCars/*.css',
                    'public/app/authentification/*.css',
                    'public/app/editCar/*.css',
                    'public/app/feedbacks/*.css',
                    'public/app/footer/*.css',
                    'public/app/mainApp/*.css',
                    'public/app/navigationBar/*.css',
                    'public/app/orders/*.css'
                ],
                dest: 'public/production/production.css'
            }
        },

        uglify: {
            dist: {
                src: 'public/production/production.js',
                dest: 'public/production/production.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['concat', 'uglify']);

};

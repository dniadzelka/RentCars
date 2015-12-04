module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),



        concat: {

            js: {
                src: (function (pattern) {
                    var scriptsPaths = grunt.file.expand(pattern);
                    return scriptsPaths.sort(function (a, b) {
                        var am = a.match(/Module/g) || [],
                        bm = b.match(/Module/g) || [];
                        return (bm.length - am.length);
                    });
                })([
                    'public/app/**/*.js'
                ]),

                dest: 'public/production/production.js'
            },

            js_libs: {
                src: [
                    'public/libs/**/*.js',
                    '!public/libs/**/angular.min.js',
                    '!public/libs/**/jquery.min.js',
                    '!public/libs/**/moment.min.js'
                ],
                dest: 'public/production/production_libs.js'
            },

            css: {
                src: [
                    'public/app/**/*.css',
                    'public/fonts/**/*.css'
                ],
                dest: 'public/production/production.css'
            },

            css_libs: {
                src: [
                    'public/libs/**/*.css'
                ],
                dest: 'public/production/production_libs.css'
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

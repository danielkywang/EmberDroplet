module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['packages/ember-droplet/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> by <%= pkg.author %> created on <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['packages/ember-droplet/*.js'],
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                options: {
                    paths: 'packages/ember-droplet/',
                    outdir: 'docs/'
                }
            }
        },
        jasmine: {
            pivotal: {
                src: ['packages/ember-droplet/*.js'],
                options: {
                    specs: 'tests/spec.js',
                    helpers: ['./bower_components/jquery/jquery.js',
                              './bower_components/handlebars/handlebars.js',
                              './bower_components/ember/ember.js']
                }
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true
            },
            dist: {
                src: ['packages/ember-droplet/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('build', ['yuidoc', 'concat', 'uglify']);
    grunt.registerTask('test', ['jshint', 'jasmine']);
    grunt.registerTask('default', ['jshint', 'jasmine', 'yuidoc', 'concat', 'uglify']);

};
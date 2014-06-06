/* global module, require */

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    // Default task
    grunt.registerTask('default', ['less:dev', 'autoprefixer:dev', 'connect', 'watch']);

    // Main build task
    grunt.registerTask('build', ['less:production', 'autoprefixer:production', 'requirejs']);

    // Config
    grunt.initConfig({
        // LESS task for processing our stylesheets
        // https://github.com/gruntjs/grunt-contrib-less
        // Two targets: dev, production
        less: {
            options: {
                paths: ['less', 'lib']
            },
            dev: {
                options: {
                    sourceMap: true,
                    compress: false,
                    cleancss: false
                },
                files: {
                    'dist/styles.dev.css': 'less/styles.less'
                }
            },
            production: {
                options: {
                    sourceMap: false,
                    compress: true,
                    cleancss: true
                },
                files: {
                    'dist/styles.css': 'less/styles.less'
                }
            }
        },
        // Autoprefixer task for prefixing CSS
        // http://css-tricks.com/autoprefixer/
        // https://github.com/ai/autoprefixer
        // https://github.com/nDmitry/grunt-autoprefixer
        autoprefixer: {
            dev: {
                files: {
                    'dist/styles.dev.css': 'dist/styles.dev.css'
                }
            },
            production: {
                files: {
                    'dist/styles.css': 'dist/styles.css'
                }
            }
        },
        // Require.js task for compiling javascript
        // https://github.com/gruntjs/grunt-contrib-requirejs
        // More info: https://github.com/jrburke/r.js/blob/master/build/example.build.js
        // This is for production only
        requirejs: {
            compile: {
                options: {
                    baseUrl: 'js',
                    mainConfigFile: 'js/main.js',
                    optimize: 'uglify',
                    keepBuildDir: true,
                    name: 'main',
                    out: 'dist/main.js'
                }
            }
        },
        // Watch task for watching files to build out
        // https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ['less/*.less', 'less/**/*.less'],
                tasks: ['less:dev', 'autoprefixer:dev']
            },
            scripts: {
                files: ['js/*.js', 'js/**/*.js']
                // probably should add some jshint tasks in here at some point
            },
            pages: {
                files: ['*.html']
            }
        },
        // Connect task (server)
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: './',
                    livereload: true
                }
            }
        }
    });
};

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),
        'jshint': {
            'beforeconcat': ['src/**/*.js'],
        },
        'copy': {
            'public': {
                'files': [
                    // copy index.html
                    {
                        'expand': true,
                        'src': ['index.html'],
                        'dest': 'public/',
                        'filter': 'isFile',
                    },
                    // copy html template in views
                    {'expand': true, 'src': ['views/**'], 'dest': 'public/'},
                    {'expand': true, 'src': ['assets/**'], 'dest': 'public/'},
                ]
            },
            'libs': {
                'files': [
                    {'expand': true, 'src': ['bower_components/bootstrap/dist/**'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-animate/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-bootstrap/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-route/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-touch/*.min.js'], 'dest': 'public/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angularUtils-pagination/*.js'], 'dest': 'public/', 'filter': 'isFile'},
                ]
            }
        },
        'concat': {
            'dist': {
                'src': ['src/**/*.js'],
                'dest': 'public/assets/js/jar.js'
            }
        },
        'uglify': {
            'options': {
                'mangle': false,
            },
            'public': {
                'files': {
                    'public/assets/js/jar.min.js': ['public/assets/js/jar.js']
                }
            }
        },
        'jsdoc': {
            'src': ['src/**/*.js'],
            'options': {
                'destination': 'docs'
            }
        }
    });

    grunt.registerTask('build',
        [
            'jshint',
            'concat',
            'copy',
            'uglify',
            'jsdoc'
        ]);
};

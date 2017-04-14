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
            '../server/src/main/webapp': {
                'files': [
                    // copy index.html
                    {
                        'expand': true,
                        'src': ['index.html'],
                        'dest': '../server/src/main/webapp/',
                        'filter': 'isFile',
                    },
                    // copy html template in views
                    {'expand': true, 'src': ['views/**'], 'dest': '../server/src/main/webapp/'},
                    {'expand': true, 'src': ['assets/**'], 'dest': '../server/src/main/webapp/'},
                ]
            },
            'libs': {
                'files': [
                    {'expand': true, 'src': ['bower_components/bootstrap/dist/**'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular/*.min.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-animate/*.min.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-bootstrap/*.min.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-route/*.min.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angular-touch/*.min.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                    {'expand': true, 'src': ['bower_components/angularUtils-pagination/*.js'], 'dest': '../server/src/main/webapp/', 'filter': 'isFile'},
                ]
            }
        },
        'concat': {
            'dist': {
                'src': ['src/**/*.js'],
                'dest': '../server/src/main/webapp/assets/js/jar.js'
            }
        },
        'uglify': {
            'options': {
                'mangle': false,
            },
            '../server/src/main/webapp': {
                'files': {
                    '../server/src/main/webapp/assets/js/jar.min.js': ['../server/src/main/webapp/assets/js/jar.js']
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

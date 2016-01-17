/*global require, module*/
'use strict';

var config = {
    app: 'src', //app sources
    dist: 'dist', // builded app
    livereloadPort: 35729,
    backendProxy: 'dobromir.openpkw.pl'
};

try {
    var homeDir = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
    console.info('[INFO] User home directory: ' + homeDir);
    var scpPrivateKeyPath = homeDir + '/.ssh/openpkw-jenkins-cd.pem';
    var scpPrivateKey = require('fs').readFileSync(scpPrivateKeyPath);
} catch (err) {
    if (err.code !== 'ENOENT') {
        throw err;
    }

    console.warn('[WARNING] SCP private key not found. Deploy task has not been registered.');
    scpPrivateKey = false;
    // Handle a file-not-found error
}

console.info('[INFO] SCP private key successfully loaded from ' + scpPrivateKeyPath);

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt); //automatyczne ladowanie modulow grunt
    require('time-grunt')(grunt);
    var modRewrite = require('connect-modrewrite');

    grunt.initConfig({
        config: config,
        bower: grunt.file.readJSON('./bower.json'),

        karma: {
            options: {
                configFile: 'tests/karma.conf.js'
            },
            unit: {},
            dist: {
                options: {
                    files: [
                        '<%= config.dist %>/js/vendors.min.js',
                        '<%= config.dist %>/js/myapp.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'tests/specs/**/*.js'
                    ]
                }
            }
        },

        watch: {
            js: {
                files: ['<%= config.app %>/assets/js/{,*/}*.js',
                            '<%= config.app %>/app/{,*/}{,*/}{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= config.livereloadPort %>'
                }
            },

            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= config.livereloadPort %>',
                    spawn: true
                },
                files: [
                    '<%= config.app %>/index.html',
                    '<%= config.app %>/app/*.html',
                    '<%= config.app %>/app/components/{,*/}*.html',
                    '<%= config.app %>/assets/css/{,*/}*.css',
                    '.tmp/css/{,*/}*.css',
                    '<%= config.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        jshint: {
            options: {
                globalstrict: true,
                reporter: require('jshint-stylish'),
                jshintrc: '.jshintrc',
                jasmine: true,
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= config.app %>/assets/js/{,*/}{,*/}{,*/}{,*/}*.js',
                    '<%= config.app %>/app/components/{,*/}{,*/}{,*/}{,*/}*.js',
                    '<%= config.app %>/app/*.js',
                    '<%= config.app %>/*.js'
                ]
            },
        },
        jscs: {
            all: [
                'Gruntfile.js',
                '<%= config.app %>/assets/js/{,*/}{,*/}{,*/}{,*/}*.js',
                '<%= config.app %>/app/components/{,*/}{,*/}{,*/}{,*/}*.js',
                '<%= config.app %>/app/*.js',
                '<%= config.app %>/*.js'
            ],
            options: {
                config: '.jscsrc'
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/{,*/}*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        copy: {
            dist: {
                files: [{
                    // includes files within path
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['*.htaccess', 'index.html', 'app/components/{,*/}{,*/}*.html',
                             'assets/resources/*'],
                    dest: '<%= config.dist %>',
                    filter: 'isFile',
                    nonull: true
                }],
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: ['*.html', 'app/components/{,*/}{,*/}*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        },
        filerev: {
            dist: {
                src: ['<%= config.dist %>/css/*.css',
                    '<%= config.dist %>/scripts/*.js',
                ]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.min.css'
                }]
            }
        },
        useminPrepare: {
            html: '<%= config.app %>/index.html',
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    html: {
                        steps: {
                            css: ['concat', 'cssmin'],
                            js: ['concat']
                        },
                        post: {}
                    }
                }
            }
        },
        usemin: {
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/css/*.css'],
            options: {
                assetsDirs: ['<%= config.dist %>']
            }
        },
        uglify: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/js',
                    src: ['myapp.js', 'vendors.min.js'],
                    dest: '<%= config.dist %>/js'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                ignorePath: /\.\.\//
            }
        },
        bowercopy: {
            options: {
                // Bower components folder will be removed afterwards
                clean: false
            },
            // Anything can be copied
            js: {
                options: {
                    destPrefix: '.tmp/vendors/'
                },
                files: {
                    // Keys are destinations (prefixed with `options.destPrefix`)
                    // Values are sources (prefixed with `options.srcPrefix`); One source per destination
                    // e.g. 'bower_components/chai/lib/chai.js' will be copied to 'test/js/libs/chai.js'
                    'angular.js': 'angular/angular.min.js',
                    'angular.route.js': 'angular-route/angular-route.min.js',
                    'jquery.js': 'jquery/dist/jquery.min.js',
                    'datatables.js': 'datatables/media/js/jquery.dataTables.js',
                    'jquery.easing.js': 'jquery.easing/js/jquery.easing.js',
                    'cbpAnimatedHeader.js': 'AnimatedHeader/js/cbpAnimatedHeader.min.js'
                }
            },
            /*css:{
                options: {
                    destPrefix: '<%= config.dist %>/css'
                },
                files: {
                    'bootstrap.min.css':'bootstrap/dist/css/bootstrap.min.css'
                }
            }*/
        },

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: '<%= config.livereloadPort %>',
                base: '/'
            },
            livereload: {
                options: {
                    open: true,
                    base: [config.app, '.tmp'],
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        var middlewares = [];

                        // 1. mod-rewrite behavior
                        middlewares = [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/bower_components', connect.static('./bower_components'))
                        ];

                        options.base.forEach(function(base) {
                            middlewares.push(connect().use(base, connect.static(base)));
                            middlewares.push(connect.static(base));
                        });

                        var directory = options.directory || options.base[options.base.length - 1];
                        middlewares.push(connect.directory(directory));
                        return middlewares;

                    }
                }
            },
            prod: {
                options: {
                    port: 8089,
                    open: false,
                    livereload: false,
                    base: '/',

                    middleware: function(connect, options) {
                        var middlewares = [];

                        middlewares = [
                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            modRewrite(['^[^\\.]*$ /index.html [L]']),
                            connect().use('/', connect.static(config.dist))
                        ];

                        return middlewares;

                    }
                }
            },
            proxies: [{
                context: '/openpkw-dokument-generator',
                host: config.backendProxy,
                port: 9080,
                https: false,
                xforward: false,
                rewrite: {
                    '^(\/openpkw-dokument-generator[/]{0,1})(.*)$': '/openpkw-dokument-generator/$2'
                }
            }]

        },

        scp: {
            options: {
                host: config.backendProxy,
                port: 22,
                username: 'openpkw-cd',
                privateKey: scpPrivateKey,
                tryKeyboard: true
            },
            dist: {
                files: [{
                    cwd: './dist',
                    src: '**/*',
                    filter: 'isFile',
                    dest: '/var/www/html/openpkw-weryfikator-frontend'
                }]
            }
        }
    });

    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['clean', 'jshint', 'jscs', 'copy', 'wiredep', 'useminPrepare',
                 'concat', 'uglify', /*'karma:dist',*/ 'cssmin', 'filerev', 'usemin', 'htmlmin'
    ]);

    grunt.registerTask('server-dev', ['configureProxies', 'connect:livereload', 'watch']);
    grunt.registerTask('server-prod', ['configureProxies', 'connect:prod:keepalive']);

    grunt.registerTask('test', ['jshint', 'jscs', 'karma:unit']);

    if (scpPrivateKey !== false) {
        grunt.registerTask('deploy', ['scp']);
    }

};

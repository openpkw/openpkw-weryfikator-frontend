/*global require, module*/
'use strict';

var config = {
    app: 'src', // app sources
    gen: 'gen', // gen sources
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
                        '<%= config.dist %>/js/openpkw.js',
                        'bower_components/angular-mocks/angular-mocks.js',
                        'tests/specs/**/*.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                sourceMap: false
            },
            dist: {
                src: [
                    '<%= config.app %>/scss/**/*.scss'
                ],
                dest: '.tmp/scss/openpkw.scss'
            }
        },
        sass: {
            options: {
                sourceMap: true
            },
            dev: {
                files: {
                    '<%= config.gen %>/css/openpkw.css': '.tmp/scss/openpkw.scss'
                }
            },
            dist: {
                files: {
                    '<%= config.dist %>/css/openpkw.css': '.tmp/scss/openpkw.scss'
                }
            }
        },
        browserify: {
            dev: {
                files: {
                    '<%= config.gen %>/js/openpkw.js': ['<%= config.app %>/es2015/openpkw.js']
                },
                options: {
                    transform: ['babelify'],
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            dist: {
                files: {
                    '<%= config.dist %>/js/openpkw.js': ['<%= config.app %>/es2015/openpkw.js']
                },
                options: {
                    transform: ['babelify'],
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },
        watch: {
            js: {
                files: '<%= config.app %>/es2015/**/*.js',
                tasks: ['browserify']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            css: {
                files: ['<%= config.app %>/scss/**/*.scss'],
                tasks: ['concat', 'sass:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            copy: {
                files: ['<%= config.app %>/**/*.*'],
                tasks: ['copy:dev']
            },
            livereload: {
                options: {
                    livereload: '<%= config.livereloadPort %>',
                    spawn: true
                },
                files: [
                    '<%= config.gen %>/index.html',
                    '<%= config.gen %>/*.html',
                    '<%= config.gen %>/**/components/**/*.html',
                    '<%= config.gen %>/css/**/*.css',
                    '.tmp/css/**/*.css',
                    '<%= config.gen %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.gen %>/**/*',
                        '<%= config.dist %>/**/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        copy: {
            dev: {
                files: [
                    {expand: true, src: ['<%= config.app %>/css/*.css'], flatten: true, dest: '<%= config.gen %>/css', filter: 'isFile'},
                    {expand: true, src: ['<%= config.app %>/images/*.*'], flatten: true, dest: '<%= config.gen %>/images', filter: 'isFile'},
                    {expand: true, src: ['<%= config.app %>/js/*.*'], flatten: true, dest: '<%= config.gen %>/js', filter: 'isFile'},
                    {expand: true, src: ['bower_components/font-awesome/fonts/*.*'], flatten: true, dest: '<%= config.gen %>/fonts', filter: 'isFile'},
                    {expand: true, src: ['<%= config.app %>/fonts/*.*'], flatten: true, dest: '<%= config.gen %>/fonts', filter: 'isFile'},
                    {
                    // includes files within path
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['index.html', 'es2015/components/**/*.html', 'resources/*'],
                    dest: '<%= config.gen %>',
                    filter: 'isFile',
                    nonull: true
                }]
            },
            dist: {
                files: [
                    //{expand: true, src: ['<%= config.app %>/styles/css/*.css'], flatten: true, dest: '<%= config.dist %>/css', filter: 'isFile'},
                    {expand: true, src: ['<%= config.app %>/images/*.*'], flatten: true, dest: '<%= config.dist %>/images', filter: 'isFile'},
                    {expand: true, src: ['bower_components/datatables/media/images/*.*'], flatten: true, dest: '<%= config.dist %>/images', filter: 'isFile'},
                    {expand: true, src: ['bower_components/font-awesome/fonts/*.*'], flatten: true, dest: '<%= config.dist %>/fonts', filter: 'isFile'},
                    {expand: true, src: ['<%= config.app %>/fonts/*.*'], flatten: true, dest: '<%= config.dist %>/fonts', filter: 'isFile'},
                    {
                    // includes files within path
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['index.html', 'es2015/components/**/*.html',
                             'resources/*'],
                    dest: '<%= config.dist %>',
                    filter: 'isFile',
                    nonull: true
                }]
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
                    src: ['*.html', 'es2015/components/**/*.html'],
                    dest: '<%= config.dist %>'
                }]
            }
        },
        filerev: {
            dist: {
                src: ['<%= config.dist %>/css/*.css',
                    '<%= config.dist %>/js/*.js'
                ]
            }
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/css',
                    src: ['*.css', '!*.min.css'],
                    dest: '<%= config.dist %>/css',
                    ext: '.css'
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
            html: ['<%= config.dist %>/**/*.html'],
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
                    src: ['openpkw.js', 'vendors.min.js'],
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
                    'jquery.js': 'jquery/dist/jquery.min.js',
                    'angular.js': 'angular/angular.min.js',
                    'angular.route.js': 'angular-route/angular-route.min.js',
                    'classie.js': 'classie/classie.js',
                    'cbpAnimatedHeader.js': 'AnimatedHeader/js/cbpAnimatedHeader.min.js',
                    'jquery.easing.js': 'jquery.easing/js/jquery.easing.js',
                    'datatables.js': 'datatables/media/js/jquery.dataTables.js',
                    'chartists.js': 'chartist/dist/chartist.js',
                    'angular-datatables.js': 'angular-datatables/dist/angular-datatables.js',
                    'angular-datatables.bootstrap.js': 'angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.js'
                }
            },
            css: {
                options: {
                    destPrefix: '<%= config.dist %>/css'
                },
                files: {
                    'chartist.min.css': 'chartist/dist/chartist.min.css'
                    //'bootstrap.min.css':'bootstrap/dist/css/bootstrap.min.css'
                }
            }
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
                    base: [config.gen, '.tmp'],
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
                host: 'rumcajs.open-pkw.pl',
                port: 1023,
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

    grunt.registerTask('compile', ['clean', 'browserify:dev', 'concat', 'sass:dev', 'copy']);

    /* TODO: fix build, karma, add eslint */
    grunt.registerTask('build', ['clean', 'browserify:dist', 'copy:dist', /*'wiredep',*/ 'useminPrepare',
        'concat', 'sass:dist', 'uglify', /*'karma:dist',*/ 'cssmin', 'filerev', 'usemin', 'htmlmin'
    ]);

    grunt.registerTask('server-dev', ['configureProxies', 'compile', 'connect:livereload', 'watch']);
    grunt.registerTask('server-prod', ['configureProxies', 'connect:prod:keepalive']);

    grunt.registerTask('test', ['karma:unit']);

    if (scpPrivateKey !== false) {
        grunt.registerTask('deploy-test', ['scp']);
    }

};

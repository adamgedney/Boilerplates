module.exports = function(grunt) {

  //Creates a reference to the package obj
  var pkg = require('./package.json');


  //Checks the dependencies associated with Grunt and autoloads
  //& requires ALL of them in this Gruntfile
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);






//=========================================//
// Project configuration.
//=========================================//
  grunt.initConfig({

    //Project app and build paths
    projectPaths : {
      app   : 'app',
      build : 'dist'
    },


    //connect settings. used in grunt serve and livereload
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= projectPaths.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '~/<%= projectPaths.build %>'
        }
      }
    },//connect






    //Sass configuration
    sass: {
      dev: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          '<%= projectPaths.app %>/css/main.css': 'scss/main.scss'
        }
      }
    },//sass






    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9'],
        diff: true
      },
      single_file: {
          expand: true,
          cwd: '<%= projectPaths.app %>/css/',
          src: 'main.scss',
          dest: '<%= projectPaths.app %>/css/'
      }
    },//autoprefixer






    //compass -required for autoprefixer
    compass: {
      options: {
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },//compass








    //cssmin -minify css file
    cssmin: {
      minify: {
        expand: true,
        cwd: '<%= projectPaths.app %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= projectPaths.app %>/css/',
        ext: '.min.css'
      }
      // files: {
      //   '/css/output.css': ['/css/main.css']
      // }
    },//cssmin









    // Empties build folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= projectPaths.build %>/*',
            '!<%= projectPaths.build %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },//clean









    // Automatically inject Bower components into the app
    'bower-install' : {
      app: {
        html: '<%= projectPaths.app %>/index.html',
        ignorePath: '<%= projectPaths.app %>/'
      }
    },









    // Renames files for browser caching purposes
    rev: {
      dist: {
        files: {
          src: [
            '<%= projectPaths.build %>/scripts/{,*/}*.js',
            '<%= projectPaths.build %>/css/{,*/}*.css'
          ]
        }
      }
    },









    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= projectPaths.app %>/index.html',
      options: {
        dest: '<%= projectPaths.build %>'
      }
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      html: ['<%= projectPaths.build %>{,*/}*.html'],
      css: ['<%= projectPaths.build %>/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= projectPaths.build %>']
      }
    },















    // Allow the use of non-minsafe AngularJS files. Automatically makes it
    // minsafe compatible so Uglify does not destroy the ng references.
    //This is why we add Angular module dependencies as strings before the function argument
    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },








    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= projectPaths.app %>',
          dest: '<%= projectPaths.build %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '.gitignore',
            '*.html',
            '*.tpl',
            'css/*',
            'views/{,*/}*',
            'images/{,*/}*',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= projectPaths.build %>/images',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },









    //Watches files and folders for us
    watch: {

      //watch to see if we change this gruntfile
      gruntfile: {
        files: ['Gruntfile.js']
      },//gruntfile

      //compass
      compass: {
        files: ['<%= projectPaths.app %>/scss/{,*/}*.{scss,sass}'],
        tasks: ['compass:server']
        //tasks: ['compass:server', 'autoprefixer'] removed to hack error. Reenable before build
      },//compass

      //livereload
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= projectPaths.app %>/{,*/}*.html',
          '<%= projectPaths.app %>/{,*/}*.php',
          '<%= projectPaths.app %>/scripts/{,*/}*.js',
          '<%= projectPaths.app %>/views/{,*/}*.tpl',
          '<%= projectPaths.app %>/scss/{,*/}*.scss',
          '<%= projectPaths.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },//livereload

      //sass
      sass: {
        files: '<%= projectPaths.app %>/scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dev', 'cssmin']
      }//sass



    }// watch
  //=========================================//
  });//grunt.initConfig
  //=========================================//









//=========================================//
//Tasks
//=========================================//

  //grunt serve
  grunt.registerTask('serve', function (target) {

    grunt.task.run([
      'connect:livereload',
      'watch',
      'sass:dev'
    ]);
  });








grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin'
  ]);






};//module.exports

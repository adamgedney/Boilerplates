module.exports = function(grunt) {

  //Creates a reference to the package obj
  var pkg = require('./package.json');


  // Checks the dependencies associated with Grunt, autoloads
  // & requires ALL of them in this Gruntfile
  //require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Just in Time loader of packages
  require('jit-grunt')(grunt);



//=========================================//
// Project configuration.
//=========================================//
  grunt.initConfig({

    options: {
      // BASE_PATH variable (in WP this is the theme folder)
      // File assumes there is an scss and css folder in this directory
      //BASE_PATH : './wp-content/themes/olympusat-kocka-child'
      BASE_PATH : '.'
    },


    //Sass configuration
    sass: {
      options: {
        sourceMap : true,
        sourceComments: 'map'
      },
      dist: {
        files: {
            '<%= options.BASE_PATH %>/css/main.css': '<%= options.BASE_PATH %>/scss/main.scss'
        }
      }
    },//sass


    //cssmin -minify css file
    cssmin: {
      options: {
        sourceMap: true
      },
      minify: {
        expand: true,
        cwd: '<%= options.BASE_PATH %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= options.BASE_PATH %>/css/',
        ext: '.min.css'
      }
    },//cssmin


    // Autoprefixer - prefix moder css where needed by reference to caniuse.com DB
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'safari 5', 'ie 6', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
      },
      single_file: {
        src: '<%= options.BASE_PATH %>/css/main.css'// Sets src and destination to the same
      }
    },


    // Uglify js files
    uglify: {
      dist: {
        files: {
          '<%= options.BASE_PATH %>/js/main.min.js': ['<%= options.BASE_PATH %>/js/main.js']
        }
      }
    },

    jshint: {
      all: [
        '<%= options.BASE_PATH %>/js/main.js'
      ]
    },


    //Watches files and folders for us
    watch: {
      sass: {
        files: ['<%= options.BASE_PATH %>/{,*/}{,*/}*.{scss,sass}','<%= options.BASE_PATH %>/js/main.js'],
        tasks: ['sass', 'cssmin', 'autoprefixer','jshint','uglify'],
        options: {
          // Livereload requires the chrome extension LiveReload to be running
          livereload: true
          // to use on https pass path to cert
          //key: grunt.file.read('path/to/ssl.key'),
          //cert: grunt.file.read('path/to/ssl.crt')
        }
      }//sass
    }// watch
  //=========================================//
  });//grunt.initConfig
  //=========================================//









//=========================================//
//Tasks
//=========================================//

  //grunt serve
  grunt.registerTask('watchyoursass', function (target) {

    grunt.task.run([
      'watch'
    ]);
  });







};//module.exports

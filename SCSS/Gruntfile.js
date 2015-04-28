module.exports = function(grunt) {

  //Creates a reference to the package obj
  var pkg = require('./package.json');


  // Checks the dependencies associated with Grunt, autoloads
  // & requires ALL of them in this Gruntfile
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);



//=========================================//
// Project configuration.
//=========================================//
  grunt.initConfig({

    options: {
      // BASE_PATH variable (in WP this is the theme folder)
      // File assumes there is an scss and css folder in this directory
      BASE_PATH : './wp-content/themes/olympusat-kocka-child'
    },

    //connect settings. used in grunt serve
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      }
    },//connect




    //Sass configuration
    sass: {
      options: {
        sourceComments: 'map',
        outputStyle: 'compressed'
      },
      dist: {
        files: {
            '<%= options.BASE_PATH %>/css/main.css': '<%= options.BASE_PATH %>/scss/main.scss'
        }
      }
    },//sass



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
        cwd: '<%= options.BASE_PATH %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= options.BASE_PATH %>/css/',
        ext: '.min.css'
      }
    },//cssmin






    //Watches files and folders for us
    watch: {

      //sass
      sass: {
        files: ['<%= options.BASE_PATH %>/{,*/}{,*/}*.{scss,sass}'],
        tasks: ['sass:dist', 'cssmin'],
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
      'watch',
    ]);
  });







};//module.exports

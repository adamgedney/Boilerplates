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
          ]
        }
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
          'css/main.css': 'scss/main.scss'
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
          cwd: 'css/',
          src: 'main.scss',
          dest: 'css/'
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
        cwd: 'css/',
        src: ['*.css', '!*.min.css'],
        dest: 'css/',
        ext: '.min.css'
      }
      // files: {
      //   '/css/output.css': ['/css/main.css']
      // }
    },//cssmin








    //Watches files and folders for us
    watch: {

      //watch to see if we change this gruntfile
      gruntfile: {
        files: ['Gruntfile.js']
      },//gruntfile

      //compass
      // compass: {
      //   files: ['scss/{,*/}*.{scss,sass}'],
      //   tasks: ['compass:server']
      //   //tasks: ['compass:server', 'autoprefixer'] removed to hack error. Reenable before build
      // },//compass

      //livereload
      livereload: {
        options: {
          livereload: true
        },
        files: [
          '{,*/}*.html',
          '{,*/}*.php',
          'js/{,*/}*.js',
          'scss/{,*/}*.scss',
          'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },//livereload

      //sass
      sass: {
        files: 'scss/{,*/}*.{scss,sass}',
        tasks: ['sass:dist', 'cssmin']
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
      // 'connect:livereload',
      'watch',
      'sass:dist'
    ]);
  });







};//module.exports

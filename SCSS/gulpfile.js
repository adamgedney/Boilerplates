// Include gulp
var gulp = require('gulp');

// Load all plugins in package.json
var plugin = require('gulp-load-plugins')();
var transform = require('vinyl-transform');
//var browserify = require('gulp-browserify');

// Path vars
const BASE_PATH 	= './';

const SCSS_PATH = BASE_PATH + 'scss';
const JS_PATH = BASE_PATH + 'js';

// Concat compiles in the order below
const JS_SOURCES = [	BASE_PATH + 'js/imports/*.js'
				 ];






//=================================//
// CSS
//=================================//

// SASS -- Compile, autoprefix, build sourcemap, livereload (w/out refresh)
gulp.task('sass-compile-prefix', function() {
	return gulp.src(SCSS_PATH + '/style.scss')
		.pipe(plugin.sourcemaps.init())
		.pipe(plugin.sass())
		.pipe(plugin.autoprefixer(['last 2 versions', 'safari 5','ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
		.pipe(plugin.sourcemaps.write('./'))// relative to gulp.dest below
		.pipe(gulp.dest(BASE_PATH));
});

// CSS -- minify
gulp.task('css',['sass-compile-prefix'],function(){
	return gulp.src(BASE_PATH + 'style.css')
		.pipe(plugin.rename({suffix: '.min'}))
		.pipe(plugin.cssmin())
		.pipe(gulp.dest(BASE_PATH))
		.pipe(plugin.livereload());
});




//=================================//
// JS
//=================================//
// lint
gulp.task('js-lint',function(){
	return gulp.src(JS_SOURCES)
		.pipe(plugin.jshint({esnext:true}))
		.pipe(plugin.jshint.reporter('default'));
});

// browserify, babel
gulp.task('browserify',['js-lint'], function () {
	return gulp.src(JS_PATH + '/app.js')
		.pipe(plugin.browserify({
			insertGlobals: true
		}))
		.pipe(plugin.rename('main.js'))
		.pipe(plugin.babel())
		.pipe(gulp.dest(JS_PATH))
});


// uglify,map
gulp.task('js',['browserify'], function(){
	return gulp.src(JS_PATH + '/main.js')
		.pipe(plugin.sourcemaps.init())

		.pipe(plugin.rename('main.min.js'))
		.pipe(plugin.uglify())

		.pipe(plugin.sourcemaps.write('./'))
		.pipe(gulp.dest(JS_PATH))

		.pipe(plugin.livereload());
});







//=================================//
// Watch  ( usage: $ gulp watch )
//=================================//
gulp.task('watch', function() {
	plugin.livereload.listen();

	// Watch scss files
	gulp.watch(SCSS_PATH + '/**/*.scss', ['css']);

	// Watch js files, ignore main.js and main.min.js
	gulp.watch([
				  JS_PATH + '/**/*.js',
			'!' + JS_PATH + '/app.js',
			'!' + JS_PATH + '/main.js',
			'!' + JS_PATH + '/main.min.js',
			'!' + JS_PATH + '/main.min.js.map'],
				['js']);
});





//=================================//
// DEBUG to console
//=================================//
gulp.task('debug', function() {
	debug = true;
	gulp.start('watch');
});
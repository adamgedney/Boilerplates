// Include gulp
var gulp = require('gulp');

// Load all plugins in package.json
var plugin = require('gulp-load-plugins')();

// Path vars
var BASE_PATH 	= './wp-content/themes/blog-olympusat/';

var SCSS_PATH = BASE_PATH + 'scss';
var JS_PATH = BASE_PATH + 'js';

// Concat compiles in the order below
var JS_SOURCES = [	BASE_PATH + 'js/libs/test.js',
	BASE_PATH + 'js/libs/test2.js',
	BASE_PATH + 'js/libs/test3.js'
];






//=================================//
// Tasks
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




// JS -- Lint, concat
gulp.task('js-lint-concat',function(){
	return gulp.src(JS_SOURCES)
		.pipe(plugin.jshint())
		.pipe(plugin.jshint.reporter('default'))

		.pipe(plugin.concat('main.js'))
		.pipe(gulp.dest(JS_PATH));
});

// JS -- uglify, source map ( Dependency:js-lint-concat )
// js-lint-concat task triggered here
gulp.task('js',['js-lint-concat'], function(){
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
	gulp.watch([JS_PATH + '/**/*.js',
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
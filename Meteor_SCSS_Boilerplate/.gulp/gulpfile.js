// Include gulp
var gulp = require('gulp');

// Load all plugins in package.json
var plugin = require('gulp-load-plugins')();

// Path vars
const BASE_PATH 	= '../';

const SCSS_PATH = BASE_PATH + 'scss';




//=================================//
// CSS
//=================================//

// SASS -- Compile, autoprefix, build sourcemap, livereload (w/out refresh)
gulp.task('sass-compile-prefix', function() {
	return gulp.src(SCSS_PATH + '/style.scss')
		.pipe(plugin.plumber({errorHandler:onError}))
		.pipe(plugin.sourcemaps.init())
		.pipe(plugin.sass())
		.pipe(plugin.autoprefixer(['last 2 versions', 'safari 5','ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
		.pipe(plugin.sourcemaps.write('./'))// relative to gulp.dest below
		.pipe(gulp.dest(BASE_PATH));
});

// CSS -- minify
gulp.task('css',['sass-compile-prefix'],function(){
	return gulp.src(BASE_PATH + 'style.css')
		.pipe(plugin.plumber({errorHandler:onError}))
		.pipe(plugin.rename({suffix: '.min'}))
		.pipe(plugin.cssmin())
		.pipe(gulp.dest(BASE_PATH))
		.pipe(plugin.livereload());
});





//=================================//
// Watch  ( usage: $ gulp watch )
//=================================//
gulp.task('watch', function() {
	plugin.livereload.listen();

	// Watch scss files
	gulp.watch(SCSS_PATH + '/**/*.scss', ['css']);
});





//=================================//
// DEBUG to console
//=================================//
gulp.task('debug', function() {
	debug = true;
	gulp.start('watch');
});


/**
 * Error handler/beeper
 * @param e
 */
function onError(e){
	console.log(e);
	this.emit('end')
}
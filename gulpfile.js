var gulp = require('gulp'),    
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
		notify = require('gulp-notify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('public:less', function () {
  gulp.src('src/css/main.less')		
    .pipe(less())
		.pipe(autoprefixer({
				browsers: [
					'last 2 versions',
					'Firefox > 3.5',
					'Chrome > 4',
					'Opera 9',
					'ie > 8'
				],
				cascade: false
		}))		
		.pipe(minifyCSS(''))
    .pipe(gulp.dest('public/css/'))
		.pipe(notify('Done!'));
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.less', ['public:less']);	
});
var gulp = require('gulp'),    
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		rigger = require('gulp-rigger'),
		uglify = require('gulp-uglify');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('html:build', function () {
    gulp.src('src/*.html')
        .pipe(rigger()) //Прогоним через rigger
        .pipe(gulp.dest('public/'));        
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

gulp.task('js:build', function () {
    gulp.src('src/js/*.js')        
        .pipe(uglify())
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
  gulp.watch('src/css/*.less', ['public:less']);	
});
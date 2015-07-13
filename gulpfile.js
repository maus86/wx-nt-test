var gulp = require('gulp'),
		watch = require('gulp-watch'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
		notify = require('gulp-notify'),
		rigger = require('gulp-rigger'),
		uglify = require('gulp-uglify'),
		imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    public: {
        html: 'public/',
        js: 'public/js/',
        css: 'public/css/',
        img: 'public/img/',
        fonts: 'public/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        css: 'src/css/main.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/css/**/*.less',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './public'
};

var config = {
    server: {
        baseDir: "./public"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "NTTest"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:public', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.public.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:public', function () {
    gulp.src(path.src.js)        
        .pipe(uglify()) 
        .pipe(gulp.dest(path.public.js))
        .pipe(reload({stream: true}));
});

gulp.task('css:public', function () {
  gulp.src(path.src.css)		
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
    .pipe(gulp.dest(path.public.css))
		.pipe(notify('Done!'));
});

gulp.task('image:public', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.public.img))
        .pipe(reload({stream: true}));
});
 
gulp.task('fonts:public', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.public.fonts))
});

gulp.task('public', [
    'html:public',
    'js:public',
    'css:public',
		'fonts:public',
    'image:public'
]);

gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:public');
    });
    watch([path.watch.css], function(event, cb) {
        gulp.start('css:public');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:public');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:public');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:public');
    });
});

gulp.task('default', ['public', 'webserver', 'watch']);
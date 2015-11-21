var webpackConfigDev = require("./webpack/webpack.config.dev.js");
var webpackConfigDist = require("./webpack/webpack.config.dist.js");

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var stream = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var stripDebug = require('gulp-strip-debug');
var clean = require('gulp-clean');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var notifier = require('node-notifier');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulpSequence = require('gulp-sequence');

var path = {
    BASE: './',
    HTML: './index.html',
    SASS: ['./sass/**/*.scss'],
    JS: ['./src/**/*.js'],
    ASSETS: ['./assets/**/*'],
    BUILD: './build',
    ASSETS_FOLDER: '/assets',
    JS_FILENAME: 'scripts.js',
    SASS_FILENAME: 'styles.css',
    DIST: './dist'
};

function alertError(error){

    notify.onError({title: "Error", message: error.Message, sound: "Pop"})(error);
    console.log(error.toString());
    this.emit("end");  

}

gulp.task('lint', function() {
      return gulp.src(path.JS)
        .pipe(jshint({esnext:6}))
        .pipe(jshint.reporter(stylish));
});

gulp.task('webpack', [], function() {
    gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfigDev,null,function(err, stats) {
            console.log(stats.compilation.errors.toString());
            console.log(stats.compilation.warnings.toString());
            notifier.notify({ title: 'Webpack Error', message: stats.compilation.errors.toString()});
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.BUILD));
});

gulp.task('webpack:build', [], function() {
    gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfigDist,null,function(err, stats) {
            console.log(stats.compilation.errors.toString());
            console.log(stats.compilation.warnings.toString());
            notifier.notify({ title: 'Webpack Error', message: stats.compilation.errors.toString()});
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(stripDebug())
        .pipe(gulp.dest(path.DIST+"/build"));
});

gulp.task('sass',[], function() {
    gulp.src(path.SASS)
    .pipe(plumber({errorHandler: alertError}))
    .pipe(sass())
    .pipe(concat(path.SASS_FILENAME))
    .pipe(gulp.dest(path.BUILD));
});

gulp.task('sass:build',[], function() {
    gulp.src(path.SASS)
    .pipe(plumber({errorHandler: alertError}))
    .pipe(sass())
    .pipe(concat(path.SASS_FILENAME))
    .pipe(gulp.dest(path.DIST+"/build"));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: path.BASE
        }
    });
});


gulp.task('watch', function() {
    gulp.watch(path.JS, ['webpack','reload']);
    gulp.watch(path.SASS, ['sass','reload']);
});

gulp.task('reload', function() {
    setTimeout(browserSync.reload,300);
});

gulp.task('clean', function() {
    del.sync([path.DIST]);
});

gulp.task('copy', function() {
    gulp.src(path.HTML).pipe(gulp.dest(path.DIST));
    gulp.src(path.ASSETS).pipe(gulp.dest(path.DIST+path.ASSETS_FOLDER));
});


gulp.task('default', ['webpack','sass', 'browser-sync', 'watch']);

// Use gulp-sequence for build task

gulp.task('build', function(cb){
    gulpSequence('clean','copy',['webpack:build','sass:build'])(function(){
        notifier.notify({ title: 'Package build', message:"Success"});
    });
});

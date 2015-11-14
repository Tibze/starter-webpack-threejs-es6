var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var stream = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var path = {
    HTML: './src/index.html',
    SASS: ['./sass/**/*.scss'],
    JS: ['./src/**/*.js'],
    BUILD: './build',
    JS_FILENAME: 'scripts.js',
    SASS_FILENAME: 'styles.css',
    DIST: './dist'
};

gulp.task('webpack', [], function() {
    return gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfig))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.BUILD));
});

gulp.task('sass',[], function() {
  
    return gulp.src(path.SASS) 
    .pipe(sass())
    .pipe(concat(path.SASS_FILENAME))
    .pipe(gulp.dest(path.BUILD));

});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
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


gulp.task('default', ['webpack','sass', 'browser-sync', 'watch']);

var webpackConfigDev = require("./webpack/webpack.config.dev.js");
var webpackConfigDist = require("./webpack/webpack.config.dist.js");

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var stream = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var del = require('del');
var stripDebug = require('gulp-strip-debug');
var clean = require('gulp-clean');

var path = {
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

gulp.task('webpack', [], function() {
    return gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfigDev))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.BUILD));
});

gulp.task('webpack:build', [], function() {
    return gulp.src(path.JS)
        .pipe(sourcemaps.init())
        .pipe(stream(webpackConfigDist))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(stripDebug())
        .pipe(gulp.dest(path.DIST+"/build"));
});

gulp.task('sass',[], function() {
  
    return gulp.src(path.SASS) 
    .pipe(sass())
    .pipe(concat(path.SASS_FILENAME))
    .pipe(gulp.dest(path.BUILD));

});

gulp.task('sass:build',[], function() {
  
    return gulp.src(path.SASS) 
    .pipe(sass())
    .pipe(concat(path.SASS_FILENAME))
    .pipe(gulp.dest(path.DIST+"/build"));

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

gulp.task('clean', function() {
    return gulp.src([path.DIST], {read: true, force:false})
        .pipe(clean());
});

gulp.task('copy', function() {
    gulp.src(path.HTML).pipe(gulp.dest(path.DIST));
    gulp.src(path.ASSETS).pipe(gulp.dest(path.DIST+path.ASSETS_FOLDER));
});


gulp.task('default', ['webpack','sass', 'browser-sync', 'watch']);
gulp.task('build', ['copy','webpack:build','sass:build']);

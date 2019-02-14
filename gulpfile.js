var path = require('path');
var gulp = require('gulp');
var { parallel, series } = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber');
var cache = require('gulp-cached');
var del = require('del');

var sources = ['src/**/*.js'];
var dest = 'dist';
var main = path.join(dest, 'index.js');

function clean() {
  	return del('dist/**');
}

function lint() {
    return gulp.src(sources)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
}

function babelify() {
  	return gulp.src(sources)
	    .pipe(sourcemaps.init())
    	.pipe(plumber())
    	.pipe(cache('babelify'))
        .pipe(babel())
	    .pipe(sourcemaps.write("."))
	    .pipe(gulp.dest(dest));
}

function watch() {
    return gulp.watch(sources, babelify);
}

function nodemon(cb) {
    nodemon({
        args: process.argv.splice(3, process.argv.length)
    }).once('start', cb);
}

exports.default = nodemon;
exports.dev = series(clean, lint, parallel(watch, nodemon));

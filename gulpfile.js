var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  ctrl: ['./www/js/controllers/*.js']
};


gulp.task('watch', function() {
  gulp.watch(paths.ctrl, ['concat']);
});

gulp.task('concat', function () {
    gulp.src('./www/js/controllers/*.js')
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('./www/js'));
});



var gulp = require('gulp');
var config = require('../config').canvas;

gulp.task('canvas', function() {
  gulp.src(config.src)
  .pipe(gulp.dest(config.dest));
});
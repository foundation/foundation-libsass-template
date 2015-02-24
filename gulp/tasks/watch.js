var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function(callback) {
  gulp.watch(config.sass.src, ['sass']);
  gulp.watch(config.js.src, ['javascript']);
  gulp.watch(config.pages.src, ['copy']);
  gulp.watch(config.src+'/*.*', ['copy']);
});

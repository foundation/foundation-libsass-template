var gulp = require('gulp');
var config = require('../config');

gulp.task('copy', function() {
  // copy all html pages
  gulp.src(config.pages.src)
  .pipe(gulp.dest(config.pages.dest));

  // copy files located in src (not a subfolder of src)
  gulp.src(config.src+'/*.*')
  .pipe(gulp.dest(config.dest));
});

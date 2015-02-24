var gulp = require('gulp');
var concat       = require('gulp-concat');
var streamqueue  = require('streamqueue');
var config = require('../config');
var bower = './bower_components';

// dependency hierarchy
var dependencies = {
    'Modernizr': {
        files: ['/modernizr/modernizr.js']
    },
    'FastClick': {
        files: ['/fastclick/lib/fastclick.js']
    },
    'jQuery': {
        files: ['/jquery/dist/jquery.js']
    },
    'jQuery.placeholder': {
        files: ['/jquery-placeholder/jquery.placeholder.js'],
        deps: ['jQuery']
    },
    'jQuery.cookie': {
        files: ['/jquery.cookie/jquery.cookie.js'],
        deps: ['jQuery']
    },
    'Foundation': {
        files: ['/foundation/js/foundation.js'],
        deps: ['jQuery', 'FastClick', 'Modernizr'] // soft dependency on FastClick
    },
};

gulp.task('javascript', function() {
    // don't bundle Modernizr into the app, because we want to 
    // use feature detection as soon as possible (in the HTML head)
    gulp.src(bower+dependencies['Modernizr'].files)
    .pipe(concat('modernizr.js'))
    .pipe(gulp.dest(config.js.dest));

    // bundle the everything other into the app.js
    // will be embedded into the HTML at the end of the body
    // use streamqueue to ensure the order, it's important for the depenencies
    return streamqueue({ objectMode: true },
        gulp.src(bower + dependencies['FastClick'].files),
        gulp.src(bower + dependencies['jQuery'].files),
        gulp.src(bower + dependencies['jQuery.placeholder'].files),
        gulp.src(bower + dependencies['jQuery.cookie'].files),
        gulp.src(bower + dependencies['Foundation'].files),
        gulp.src(config.js.src) // our custom app code
    )
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.js.dest));
});
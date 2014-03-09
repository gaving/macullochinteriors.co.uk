var gulp = require('gulp');

var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');

var paths = {
  js: ['public/js/**/*.js'],
  coffee: ['public/src/**/*.coffee'],
  images: 'public/img/**/*'
};

gulp.task('scripts', function() {
  return gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(gulp.dest('public/js'));
});

gulp.task('minify', function() {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('public/js'));
});

// Copy all static images
gulp.task('images', function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'minify', 'watch']);

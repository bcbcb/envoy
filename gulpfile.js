var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var bourbon = require("bourbon").includePaths;
var neat = require("bourbon-neat").includePaths;

var sassWatchPath = './src/scss/**/*.scss';
var buildWatchPath = './dist/**/*';

gulp.task('connect', function(){
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('sass', function() {
  gulp.src(sassWatchPath)
    .pipe(sass({
      sourcemaps: true,
      includePaths: [bourbon, neat]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./dist/css/'))
});

gulp.task('livereload', function (){
  gulp.src(buildWatchPath)
  .pipe(connect.reload());
});

gulp.task('watch', function () {
  gulp.watch(sassWatchPath, ['sass']);
  gulp.watch(buildWatchPath, ['livereload']);
});

gulp.task('default', ['connect', 'watch', 'sass']);

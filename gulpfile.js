var gulp = require('gulp');
var webserver = require('gulp-webserver');

gulp.task('default', function(){

  gulp
  .src('./')
  .pipe(webserver({
    port: 3000,
    host: '0.0.0.0',
    livereload: true
  }));
});
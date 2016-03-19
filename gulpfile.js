// Include gulp
var gulp = require('gulp'); 
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

var paths = {
  scripts: [ './js/**/*.js', './js/*.js', '!./bower_components/**/*.js' ],
  html: [
    './js/**/*.html',
    '!index.html',
    '!./bower_components/**/*.html'
  ],
  scss:'./scss/*.scss',
  index: 'index.html',
  build: './build/'
}
/* 1 */
gulp.task('clean', function(){
  gulp.src( paths.build, { read: false } )
    .pipe(clean());
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('jshint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Sass task
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css/'))
        .pipe(browserSync.stream());
});

gulp.task('build', ['usemin']);

// browser-sync
gulp.task('serve', ['jshint', 'sass'], function () {

    // Serve files from the root of this project
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(paths.scripts, ['jshint']);
    gulp.watch(paths.scss, ['sass']);
    gulp.watch(paths.index).on('change', browserSync.reload);
    gulp.watch(paths.scripts).on('change', browserSync.reload);
    gulp.watch(paths.html).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

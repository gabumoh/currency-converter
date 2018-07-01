const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Complie sass and inject into browser

gulp.task('sass', function() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
})

// Move Js Files to serve
gulp.task('js', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(browserSync.stream());
})

// Watch Sass and Server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "."
    });
    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['*.html']).on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);
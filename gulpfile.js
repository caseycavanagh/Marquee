var gulp = require('gulp');
var $ = require("gulp-load-plugins")();

var onError = function(err) {
    $.util.beep();
    $.notify().write(err);
};

gulp.task('styles', function() {
    return gulp.src( 'build/scss/screen.scss' )
        .pipe($.sass({
            style: 'expanded',
            onError: function(err){
                $.notify().write(err);
            }
        }))
        .pipe($.autoprefixer('last 2 versions'))
        .pipe(gulp.dest( 'dist/stylesheets' ))
});

gulp.task('react', function () {
    return gulp.src('template.jsx')
        .pipe($.plumber({
            errorHandler: onError
        }))
        .pipe($.react())
        .pipe(gulp.dest('dist'))
});

gulp.task('scripts', function() {
    return gulp.src( 'index.html' )
        .pipe($.usemin({
            js: [
                $.uglify()
            ]
        }))
        .pipe(gulp.dest( 'dist' ))
});

gulp.task('mover', function() {
    return gulp.src(['data/*'], {base: './'})
        .pipe(gulp.dest('dist/'))
});

gulp.task('open', function() {
    gulp.src('dist/index.html')
        .pipe($.open('<%file.path%>', {
            url: 'http://localhost:8080'
        }));
});

gulp.task('connect', function() {
    $.connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('default', ['scripts', 'styles', 'react', 'mover','connect','open'], function() {
    gulp.watch(['index.html', 'build/js/**/*.js'], ['scripts']);
    gulp.watch('build/scss/**/*.scss', ['styles']);
    gulp.watch('template.jsx', ['react']);
});

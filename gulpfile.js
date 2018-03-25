var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    coffee = require('gulp-coffee'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    exec = require('child_process').exec;

var coffeeSources = ['scripts/hello.coffee'],
    jsSources = ['scripts/*.js'],
    sassSources = ['styles/*.scss'],
    htmlSources = ['**/*.html'],
    outputDir = 'assets';

var timeStamp = '/* Created: ${new Date().toLocaleString()} */\n';
function clean(done) {
    rimraf(PATHS.dist, done);
}
gulp.task('log', function() {
    gutil.log('== My First Task ==')
});

gulp.task('copy', function() {
    gulp.src('index.html')
        .pipe(gulp.dest(outputDir))
});

gulp.task('sass', function() {
    gulp.src(sassSources)
        .pipe(sass({style: 'expanded'}))
        .on('error', gutil.log)
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets'))
        .pipe(connect.reload())
});

gulp.task('coffee', function() {
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('scripts'))
});

gulp.task('js', function() {
    gulp.src(jsSources)
        .pipe(uglify())
        .pipe(concat('script.js'))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(coffeeSources, ['coffee']);
    gulp.watch(jsSources, ['js']);
    gulp.watch(sassSources, ['sass']);
    gulp.watch(htmlSources, ['html']);
});

// gulp.task('connect', function() {
//     connect.server({
//         root: '.',
//         livereload: true
//     })
// });
gulp.task('connect', function (cb) {
    exec('node server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
})
gulp.task('html', function() {
    gulp.src(htmlSources)
        .pipe(connect.reload())
});
gulp.task('clean', function(done) {
    rimraf('assets',done);

});

gulp.task('default', ['clean', 'html', 'coffee', 'js', 'sass', 'connect', 'watch']);
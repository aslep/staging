var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true, // 去掉空白字符
            minifyJS: true, //压缩页面JS
            minifyCSS: true, //压缩页面CSS
            removeComments: true //清除HTML注释
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('lessmin', function() {
    gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('uglify', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('default', function() {
    gulp.run(['html', 'lessmin', 'uglify']);
    gulp.watch('./src/**/*.html', function() {
        gulp.run('html')
    });
    gulp.watch('./src/less/*.less', function() {
        gulp.run('lessmin')
    });
    gulp.watch('./src/js/*.js', function() {
        gulp.run('uglify')
    })
})
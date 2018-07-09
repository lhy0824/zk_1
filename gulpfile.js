var gulp = require('gulp');

var server = require('gulp-webserver');

var uglify = require('gulp-uglify');

var html = require('gulp-htmlmin');

var fs = require('fs');

var url = require('url');

var css = require('gulp-sass');

var path = require('path');

//搭建服务器
gulp.task('server', ['css'], function() {
    gulp.src('src')
        .pipe(server({
            port: '8888',
            livereload: true,
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});

//css
gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(css())
        .pipe(gulp.dest('build/css'))
});

//html
gulp.task('html', function() {
    gulp.src('./src/html/*.html')
        .pipe(html())
        .pipe(gulp.dest('build/html'))
});

//js
gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

gulp.task('build', ['server', 'js', 'html'])
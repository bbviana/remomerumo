var babelify = require("babelify");
var browserify = require('browserify');
var connect = require('gulp-connect');
var gulp = require('gulp');
var gutil = require('gulp-util');
var notifier = require("node-notifier");
var source = require('vinyl-source-stream');
var watchify = require('watchify');

// var livereload = require('gulp-livereload');

var paths = {
    src: './src/main/js',
    target: './src/main/webapp/js'
};

var build = function (watch) {
    var bundler = browserify({
        entries: [paths.src + '/main.jsx'],
        extensions: ['.js', '.jsx'],
        transform: [
            // es6 to es5 + reactify
            babelify.configure({
                stage: 0,
                optional: ["es7.decorators"]
            })
        ],
        debug: true, // sourcemapping: TRUE em dev
        // cache, packageCache, fullPaths: necessários pra o watchify
        cache: {},
        packageCache: {},
        fullPaths: true
    });
    // bundler.transform({global: true}, 'uglifyify');

    var bundle = function () {
        bundler.bundle()
            .on('error', function (error) {
                gutil.log(gutil.colors.bgRed(error.message));
                notifier.notify({
                    title: 'Error',
                    message: 'Check console for details'
                })
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(paths.target))
            // .pipe(livereload());
            .pipe(connect.reload());
    };

    if (watch) {
        // livereload.listen();

        bundler = watchify(bundler);

        bundler
            .on('update', bundle) // When any files update
            .on('time', function (time) {
                gutil.log('Bundle Gerado', gutil.colors.magenta(time + 'ms'));
                notifier.notify({
                    title: 'Bundle Gerado',
                    message: time + 'ms'
                });
            });
    }

    return bundle();
};

gulp.task('webserver', function() {
    connect.server({
        livereload: true,
        port: 8000,
        root: ['webapp']
    });
});

gulp.task('build', build.bind(this, false));
gulp.task('watch', build.bind(this, true));
gulp.task('default', ['webserver', 'watch']);

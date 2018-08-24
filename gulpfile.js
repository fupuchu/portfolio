//plugins
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create()
// const autoprefixer = require('gulp-autoprefixer');

//testing
gulp.task('hello' , () => {
    console.log('Nothing going on here');
});
//builds
gulp.task('build', ['minify'], () => {
    console.log('Building..');
    return gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    // .pipe(autoprefixer({
    //     browsers : ['last 2 versions'],
    //     cascade : false
    // }))
    .pipe(browserSync.reload ({
        stream : true
    }));
});
gulp.task('minify' , () => {
    return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: '*' , debug: true} , (details) => {
        console.log(details);
    }))
    .pipe(gulp.dest('app/css/min'));
})
//watcher
gulp.task('watch' , ['browserSync' , 'build' , 'minify'], () => {
    gulp.watch('app/scss/*.scss', ['build']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('js/*.js' , browserSync.reload);
})

//browser sync
gulp.task('browserSync', () => {
    browserSync.init ({
        server : {
            baseDir: 'app'
        }
    });
})
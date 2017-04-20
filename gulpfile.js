const gulp = require("gulp");
const $    = require("gulp-load-plugins")();
const browserSync = require('browser-sync').create();
const reload      = browserSync.reload;
gulp.task("minjs",function(){
        gulp.src("./js/*.js")
            .pipe($.concat('main.js'))
            .pipe(gulp.dest("./dest/js"))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.uglify())
            .pipe(gulp.dest('./dest/js'));
    });
gulp.task("mincss",function(){
        gulp.src("./css/*.css")
            .pipe($.concat('main.css'))
            .pipe(gulp.dest("./dest/css"))
            .pipe($.rename({suffix: '.min'}))
            .pipe($.minifyCss())
            .pipe(gulp.dest('./dest/css'));
    })

  gulp.task('watch',function(){

          gulp.watch("./css/*.css",['mincss']);
          gulp.watch("./js/*.js",['minjs'])
      })
gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./js/*.js").on('change', reload);
    gulp.watch("./css/*.css").on('change', reload);
    gulp.watch("*.html").on('change', reload);
});

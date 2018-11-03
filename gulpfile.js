var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch-sass");
var rename = require("gulp-rename");
var inject = require("gulp-inject");

// sass: Compile CSS

gulp.task("sass", function() {
  return gulp
    .src("./src/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("./src/"))
    .pipe(
      rename({
        extname: ".css"
      })
    );
});

// watch: Watch Sass files

gulp.task('watch', function() {
  gulp.watch('./src/*.scss', ['sass']);
});

// inject: Inject CSS into main.html

gulp.task('inject', function() {
  var target = gulp.src('./src/main.html');
  .pipe(inject(gulp.src(['./src/*.css']), {
    starttag: '<!-- inject:head:{{ext}} -->',
    transform: function (filePath, file) {
      let css = ['<style>', file.contents.toString('utf8'), '</style>']
      return css.join('\n');
    }
  }))
  .pipe(gulp.dest('./public'));
});

gulp.task('default', ['sass', 'inject']);

'use strict'

let gulp = require('gulp')
let sass = require('gulp-sass')
let rename = require('gulp-rename')
let inject = require('gulp-inject')
let cleanCSS = require('gulp-clean-css')
var runSequence = require('run-sequence')

sass.compiler = require('node-sass')

// sass: Compile Sass
gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src'));
});

// sass:watch: Watch for Sass changes
gulp.task('sass:watch', function () {
  gulp.watch('./src/**/*.scss', ['sass']);
});

// minify-css: Minify CSS
gulp.task('minify-css', function() {
  return gulp
    .src('./src/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./src/'))
    .pipe(
      rename(function(path) {
        path.basename += '.min'
      })
    )
})

// inject-css: Inject CSS into main.html
gulp.task("inject-css", function() {
  return gulp
    .src("./src/main.html")
    .pipe(
      inject(gulp.src(["./src/*.css"]), {
        starttag: "<!-- inject:head:{{ext}} -->",
        transform: function(filePath, file) {
          let css = [
            '<style type="text/css">',
            file.contents.toString("utf8"),
            "</style>"
          ]
          return css.join("\n")
        }
      })
    )
    .pipe(gulp.dest("./public"))
})

// inject-compiled: Compile Sass, Minify CSS then inject minified CSS into head of main.html in sequence
gulp.task("inject-compiled", gulp.series('sass', "minify-css", "inject-css"));

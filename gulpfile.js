let gulp = require("gulp")
let rename = require("gulp-rename")
let inject = require("gulp-inject")
let cleanCSS = require("gulp-clean-css")
var runSequence = require("run-sequence")

// minify-css: Minify CSS

gulp.task("minify-css", function() {
  return gulp
    .src("./src/*.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest("./src/"))
    .pipe(
      rename(function(path) {
        path.basename += ".min"
      })
    )
})

// inject-css: Inject CSS into main.html

gulp.task("inject-css", function() {
  gulp
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

// default: Minify CSS then inject minified CSS into head of main.html in sequence

gulp.task("default", function() {
  runSequence("minify-css", "inject-css")
})

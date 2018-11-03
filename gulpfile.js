var gulp = require("gulp");
var sass = require("gulp-sass");
let watch = require("gulp-watch-sass");
let rename = require("gulp-rename");

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

gulp.task("watch", function() {
  console.log("working");
  gulp.watch("./src/*.scss", ["sass"]);
});

gulp.task("default", []);

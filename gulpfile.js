const gulp = require("gulp");
const zip = require("gulp-zip");

function bundle() {
  return gulp
    .src([
      "**/*",
      "!node_modules/**",
      "!src/**",
      "!gulpfile.js",
      "!package.json",
      "!package-lock.json",
      "!webpack-config.js",
      "!.gitignore",
    ])
    .pipe(zip("dh-gutenberg.zip"))
    .pipe(gulp.dest("bundled"));
}

exports.bundle = bundle;

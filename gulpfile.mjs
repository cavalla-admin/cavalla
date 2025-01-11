//const uglify = require("gulp-uglify");
import gulp from "gulp";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer"; // Correct import
import * as sass from "sass"; // Import sass as an object
import gulpSass from 'gulp-sass';
import postcssScss from "postcss-scss"; // Import the SCSS parser

const sassCompiler = gulpSass(sass);


// Define tasks
gulp.task("css", () => {
  return gulp
    .src("scss/*.scss")
    .pipe(postcss([autoprefixer()], { parser: postcssScss })) // Apply PostCSS with autoprefixer
    .pipe(sassCompiler().on('error', sassCompiler.logError)) // Compile Sass to CSS
    .pipe(gulp.dest("dist/css"));
});

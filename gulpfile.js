const { src, dest, series, parallel } = require("gulp");
const babel = require("gulp-babel");
const htmlmin = require("gulp-htmlmin");
const inject = require("gulp-inject");
const postcss = require("gulp-postcss");
const uglify = require("gulp-uglify");
const del = require("delete");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const imagemin = require("gulp-imagemin");

function clear(cb) {
  return del(["./dist/css", "./dist/js", "./dist/*.html", "./dist/image"], cb);
}

function css() {
  return src("./src/css/*.css")
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("./dist/css"));
}

function javascript() {
  return src("./src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(dest("./dist/js"));
}

const sources = src(["./dist/css/*.css", "./dist/js/*.js"], {
  read: false,
});
const libSources = src(["dist/lib/*"], { read: false });

function html() {
  return src("./index.html")
    .pipe(dest("./dist"))
    .pipe(inject(sources, { relative: true }))
    .pipe(inject(libSources, { name: "head", relative: true }))
    .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
    .pipe(dest("./dist"));
}

function image() {
  return src("./src/image/*")
    .pipe(imagemin([imagemin.mozjpeg({ quality: 75, progressive: true })]))
    .pipe(dest("./dist/image"));
}

exports.default = series(clear, parallel(css, javascript, image), html);

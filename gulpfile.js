const { src, dest, watch, parallel, series, lastRun } = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const imagemin = require('gulp-imagemin');
const jsonminify = require('gulp-jsonminify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const htmlmin = require('gulp-htmlmin');
const cssmin = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');

const srcPath = './src/**';
const distPath = './dist/';
const wxssFiles = [`${srcPath}/*.wxss`];
const wxmlFiles = [`${srcPath}/*.wxml`, `!${srcPath}/_template/*.wxml`];
const lessFiles = [
    `${srcPath}/*.less`,
    `!${srcPath}/styles/**/*.less`,
    `!${srcPath}/_template/*.less`
];
const jsonFiles = [`${srcPath}/*.json`, `!${srcPath}/_template/*.json`];
const jsFiles = [`${srcPath}/*.js`, `!${srcPath}/_template/*.js`, `!${srcPath}/env/*.js`];
const imgFiles = [
    `${srcPath}/images/*.{png,jpg,gif,ico}`,
    `${srcPath}/images/**/*.{png,jpg,gif,ico}`
];

/* 清除dist目录 */
function clean(done) {
    del.sync(['dist/**/*']);
    done();
}

/* 编译wxss文件 */
function wxss() {
    return src(wxssFiles, { since: lastRun(wxss) })
        .pipe(autoprefixer([
            'iOS >= 8',
            'Android >= 4.1'
        ]))
        .pipe(dest(distPath));
}

/* 编译wxml文件 */
function wxml() {
    return src(wxmlFiles, { since: lastRun(wxml) })
        .pipe(sourcemaps.init())
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            keepClosingSlash: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(distPath));
}

/* 编译JS文件 */
function js() {
    return src(jsFiles, { since: lastRun(js) })
        .pipe(sourcemaps.init())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(distPath));
}

/* 配置请求地址相关 */
function envJs() {
    return src(`./src/env/${process.env.NODE_ENV}.js`)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(rename('env.js'))
        .pipe(dest(distPath));
}

/* 编译json文件 */
function json() {
    return src(jsonFiles, { since: lastRun(json) })
        .pipe(jsonminify())
        .pipe(dest(distPath));
}

/* 编译less文件 */
function wxssLess() {
    return src(lessFiles)
        .pipe(less())
        .pipe(autoprefixer([
            'iOS >= 8',
            'Android >= 4.1'
        ]))
        .pipe(cssmin())
        .pipe(rename({ extname: '.wxss' }))
        .pipe(dest(distPath));
}

/* 编译压缩图片 */
function img() {
    return src(imgFiles, { since: lastRun(img) })
        .pipe(imagemin())
        .pipe(dest(distPath));
}

/* watch */
function watchUpdate() {
    let watchLessFiles = [...lessFiles];
    watchLessFiles.pop();
    watch(watchLessFiles, wxssLess);
    watch(wxssFiles, wxss);
    watch(jsFiles, js);
    watch(imgFiles, img);
    watch(jsonFiles, json);
    watch(wxmlFiles, wxml);
}

/* build */
const build = series(
    clean,
    parallel(wxml, js, json, wxss, wxssLess, img, envJs)
);

/* dev */
const dev = series(
    clean,
    parallel(wxml, js, json, wxss, wxssLess, img, envJs),
    watchUpdate
);

/* test */
const test = series(
    clean,
    parallel(wxml, js, json, wxss, wxssLess, img, envJs)
);

exports.clean = clean;
exports.dev = dev;
exports.test = test;
exports.build = build;
exports.default = build;

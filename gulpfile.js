const { series } = require('gulp');
const { src, dest } = require('gulp');
const gulp = require('gulp');
const prettier = require('gulp-prettier');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');
const concat = require('gulp-concat');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const nodemon = require('gulp-nodemon');

const matchExports = new RegExp(/export /gim);
const matchOtherExports = new RegExp(/export[ ]?{[A-Za-z0-9_.,$ ]*};/gim);
const matchExportDefault = new RegExp(/export default /gim);
const matchImports = new RegExp(/import[ ]?[{]?[A-Za-z0-9_.,$ ]*[}]?[ ]?from[ ]?["'][A-Za-z0-9_.\/-]*["'];/gim);
const matchRequire = new RegExp(/const e[ ]?=[ ]?["']express["'];[\n]?e;/gm);

const tsFiles = ['src/app.ts', 'src/Models/*.ts', 'src/pages/!(error)*.ts', 'src/**/*.ts', 'src/pages/error.ts'];
const nodeRequires = `const express=require("express");
        const bodyParser=require("body-parser");
        const cors=require("cors");
        const passport=require("passport");
        const LocalStrategy=require("passport-local");
        const session=require("express-session");
        const mongoose=require("mongoose");
        const bcrypt=require("bcryptjs");`
  .replace(/\n/g, '')
  .replace(/\B\s+|\s+\B/gm, '');

const compileTs = () =>
  // tsProject
  //   .src()
  src(tsFiles)
    .pipe(tsProject())
    .js.pipe(concat('main.js'))
    .pipe(replace(matchImports, ''))
    .pipe(replace(matchExportDefault, ''))
    .pipe(replace(matchExports, ''))
    .pipe(replace(matchOtherExports, ''))
    .pipe(gulp.dest('dist/prod'));

const replaceImports = () =>
  src(['dist/prod/main.js', 'dist/prod/main.min.js']).pipe(replace(matchRequire, nodeRequires)).pipe(dest('dist/prod'));

const minifyTs = () =>
  // tsProject
  //   .src()
  src(tsFiles)
    .pipe(tsProject())
    .js.pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(replace(/\n/g, ''))
    .pipe(replace(matchImports, ''))
    .pipe(replace(matchExportDefault, ''))
    .pipe(replace(matchExports, ''))
    .pipe(replace(matchOtherExports, ''))
    .pipe(gulp.dest('dist/prod'));

const format = () =>
  src('src/ts/*.ts')
    .pipe(prettier(require('./.prettierrc.js')))
    .pipe(dest(File => File.base));

const build = series(compileTs, minifyTs, replaceImports, format);
const watchDev = () => gulp.watch('src/**/*', build);

exports.compileTs = compileTs;
exports.minifyTs = minifyTs;
exports.format = format;
exports.build = build;
exports.default = watchDev;

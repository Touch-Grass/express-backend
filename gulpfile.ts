import { parallel, series, watch } from 'gulp';
import { src, dest } from 'gulp';
import gulp from 'gulp';
import { default as WB } from 'webpack-stream';

const eslint = require('gulp-eslint');
const prettier = require('gulp-prettier');

const format = () =>
    src('src/**/*.ts').pipe(prettier.check(require('./.prettierrc.js')))
        ? src('src/**/*.ts')
        : src('src/**/*.ts')
              .pipe(prettier.format(require('./.prettierrc.js')))
              .pipe(dest(File => File.base));

const webpack = () =>
    gulp
        .src('src/**/*.ts')
        .pipe(WB(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));

const lint = () => src('src/**/*.ts').pipe(eslint.format()).pipe(eslint.failAfterError());

// const build = () => watch('src/**/*.ts', series(parallel(format, lint), webpack));
const build = () => watch('src/**/*.ts', series(parallel(format, lint), webpack));

export default build;

import { series, watch } from 'gulp';
import { src } from 'gulp';
import gulp from 'gulp';
import { default as WB } from 'webpack-stream';

const gulpESLintNew = require('gulp-eslint-new');

const webpack = () =>
    gulp
        .src('src/**/*.ts')
        .pipe(WB(require('./webpack.config.js')))
        .pipe(gulp.dest('dist/'));

const lint = () =>
    src('src/**/*.*')
        .pipe(gulpESLintNew({ fix: true }))
        .pipe(gulpESLintNew.fix())
        .pipe(gulpESLintNew.format())
        .pipe(gulpESLintNew.failAfterError());


const build = () => watch('src/**/*.ts', series(lint, webpack));

export default build;

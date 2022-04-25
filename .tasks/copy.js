import paths from './config/paths.js';

import gulp from 'gulp';
import plumberNotifier from 'gulp-plumber-notifier';
import flatten from 'gulp-flatten';

const isProduction = process.env.NODE_ENV === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const copy = {
  font: () => {
    return gulp.src(paths.font.src).pipe(plumberNotifier()).pipe(flatten()).pipe(gulp.dest(dest));
  },
  json: () => {
    return gulp.src(paths.json.src).pipe(plumberNotifier()).pipe(gulp.dest(dest));
  },
  css: () => {
    return gulp.src(paths.css.src).pipe(plumberNotifier()).pipe(gulp.dest(dest));
  }
};

export default copy;

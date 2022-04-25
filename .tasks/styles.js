import paths from './config/paths.js';
import gulp from 'gulp';
import plumberNotifier from 'gulp-plumber-notifier';
import gulpIf from 'gulp-if';
import gulpPostCss from 'gulp-postcss';
import gulpStylelint from 'gulp-stylelint';
import combineMedia from 'gulp-combine-media';

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

import autoprefixer from 'autoprefixer';
import postcssClean from 'postcss-clean';
import postcssComineDuplicatedSelector from 'postcss-combine-duplicated-selectors';
import postCssSortMediaQuery from 'postcss-sort-media-queries';
import postcssConfig from './config/postcss.js';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const styles = () => {
  return gulp
    .src(paths.scss.src, {
      since: gulp.lastRun(styles),
      sourcemaps: !isProduction
    })
    .pipe(plumberNotifier())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(isProduction, combineMedia()))
    .pipe(gulpIf(isProduction, gulpPostCss([autoprefixer(postcssConfig.autoprefixer)])))
    .pipe(gulpIf(isProduction, gulpPostCss([postcssClean(postcssConfig.clean)])))
    .pipe(gulpIf(isProduction, gulpPostCss([postcssComineDuplicatedSelector()])))
    .pipe(
      gulpIf(
        isProduction,
        gulpPostCss([
          postCssSortMediaQuery({
            sort: 'desktop-first'
          })
        ])
      )
    )
    .pipe(
      gulpStylelint({
        failAfterError: false,
        debug: true
      })
    )
    .pipe(gulp.dest(dest, { sourcemaps: '.' }));
};

export default styles;

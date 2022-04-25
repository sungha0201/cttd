'use strict';

import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import paths from './.tasks/config/paths.js';

import browserSyncConfig from './.tasks/config/browserSync.js';

// Dependencies
import gulp from 'gulp';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';
import inlineSource from 'gulp-inline-source';

// .tasks
import clean from './.tasks/clean.js';
import styles from './.tasks/styles.js';
import scripts from './.tasks/scripts.js';
import markup from './.tasks/markup.js';
// import images from './.tasks/images.js';
import copy from './.tasks/copy.js';
import publicImages from './.tasks/public.js';

const bs = browserSync.create();
const isProduction = process.env.NODE_ENV === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const server = () => {
  bs.init(browserSyncConfig);
};

const watch = () => {
  gulp.watch(paths.scss.src, gulp.series(styles, replacePath));
  gulp.watch(paths.html.src, gulp.series(markup, replacePath));
  gulp.watch(paths.js.src, gulp.series(scripts, replacePath));
  gulp.watch(paths.css.src, gulp.series(copy.css, replacePath));
  // gulp.watch(paths.image.src, images);
};

const replacePath = () => gulp.src(`${dest}**/*.{html,css,js}`, { since: gulp.lastRun(replacePath) }).pipe(gulp.dest(dest));

const inlineSourceResource = () => {
  return gulp
    .src(`${dest}**/*.html`)
    .pipe(
      inlineSource({
        compress: false,
        pretty: true
      })
    )
    .pipe(replace('@charset "UTF-8";', ''))
    .pipe(
      gulp.dest(file => {
        return file.base;
      })
    );
};

const copyTaskList = [copy.font, copy.json, copy.css];
const buildTaskList = [scripts, styles, markup];
const buildTask = gulp.parallel(buildTaskList);
const copyTask = gulp.parallel(copyTaskList);
const cleanTask = gulp.parallel([clean]);
const publicTask = gulp.parallel([publicImages]);
const watchTask = gulp.parallel([server, watch]);

let build;
if (isProduction) {
  build = gulp.series(cleanTask, buildTask, copyTask, inlineSourceResource);
} else {
  build = gulp.series(cleanTask, buildTask, copyTask, watchTask);
}

export { build as default, cleanTask as clean, publicTask as public };

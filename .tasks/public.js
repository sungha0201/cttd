import paths from './config/paths.js';

import gulp from 'gulp';
import plumberNotifier from 'gulp-plumber-notifier';
import imagemin from 'gulp-imagemin';

const publicImages = () => {
  return gulp
    .src(paths.publicImage.src, { since: gulp.lastRun(publicImages) })
    .pipe(plumberNotifier())
    .pipe(
      imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 5,
        svgoPlugins: [
          {
            removeViewbox: false,
          },
        ],
      }),
    )
    .pipe(gulp.dest(paths.publicImage.dest));
};
export default publicImages;

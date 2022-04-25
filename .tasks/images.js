import paths from './config/paths.js';

import gulp from 'gulp';
import plumberNotifier from 'gulp-plumber-notifier';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const images = () => {
  return gulp
    .src(paths.image.src, { since: gulp.lastRun(images) })
    .pipe(plumberNotifier())
    .pipe(
      imagemin([
        gifsicle({ interlaced: true }),
        mozjpeg({ quality: 50, progressive: true }),
        optipng({ optimizationLevel: 5 }),
        svgo({
          plugins: [
            {
              name: 'removeViewBox',
              active: true
            },
            {
              name: 'cleanupIDs',
              active: false
            }
          ]
        })
      ])
    )
    .pipe(gulp.dest(dest));
};
export default images;

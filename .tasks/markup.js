import paths from './config/paths.js';

import gulp from 'gulp';
import plumberNotifier from 'gulp-plumber-notifier';
import gulpIf from 'gulp-if';
import gulpReplace from 'gulp-replace';
import fileInclude from 'gulp-file-include';
import htmlhint from 'gulp-htmlhint';

import processScssBlocks from './process-scss-blocks.js';
import through from 'through2';

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const markup = () => {
  // Layout 관련된 inclue 를 제거하기 위한 패턴
  const regex = /@@include([\"\']?([^\"\'\s\>]+(.*\/)_layout)[^\)]*(\)))/gm;
  // const urlRegex = /(http(s)?:\/\/)([a-z0-9\w]+\.*)+[a-z0-9]{2,4}\//gi;
  return (
    gulp
      .src(paths.html.src, { since: gulp.lastRun(markup) })
      // .src('./src/**/event/test.html')
      .pipe(plumberNotifier())
      .pipe(htmlhint({ htmlhintrc: '.htmlhintrc' }))
      .pipe(htmlhint.reporter())
      // html 내 scss 처리
      .pipe(
        through.obj(async function (file, _, cb) {
          const contents = file.contents.toString();
          file.contents = Buffer.from(await processScssBlocks(contents));
          cb(null, file);
        })
      )
      // Layout include 삭제
      .pipe(gulpIf(isProduction, gulpReplace(regex, '')))
      // .pipe(plugins.if(isProduction, plugins.replace(urlRegex, '/')))
      .pipe(
        fileInclude({
          prefix: '@@',
          basepath: '@file',
          indent: true
        })
      )

      // .pipe(plugins.htmllint())
      .pipe(gulp.dest(dest))
  );
};

export default markup;

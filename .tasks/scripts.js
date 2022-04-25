import paths from './config/paths.js';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const env = process.env.NODE_ENV;
const isProduction = env === 'production';
const destPath = isProduction ? `dist/${process.env.PROJECT_ROOT}` : `.dev-server/${process.env.PROJECT_ROOT}`;

import { resolve } from 'path';
import gulp from 'gulp';
import rollupEach from 'gulp-rollup-each';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import eslint from '@rollup/plugin-eslint';

const configFile = resolve(resolve(), './babel.config.cjs');
const plugins = [
  eslint(),
  nodeResolve({
    browser: true
  }),
  commonjs(),
  babel({
    exclude: /node_modules\/(?!nanoid)/,
    babelHelpers: 'runtime',
    configFile
  })
];

if (isProduction) {
  plugins.push(terser());
}

const scripts = () => {
  return gulp
    .src(paths.js.src, {
      since: gulp.lastRun(scripts),
      sourcemaps: !isProduction
    })
    .pipe(
      rollupEach(
        {
          plugins
        },
        {
          output: {
            // outputOptions
            format: 'iife',
            sourcemap: !isProduction
          }
        }
      )
    )
    .pipe(gulp.dest(destPath, { sourcemaps: '.' }));
};

export default scripts;

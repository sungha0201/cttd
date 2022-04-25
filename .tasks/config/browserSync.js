import paths from './paths.js';

const browserSync = {
  server: {
    baseDir: paths.server.baseDir,
    directory: true
  },
  serveStatic: [
    {
      route: ['/public'],
      dir: 'public'
    }
  ],
  cors: true,
  files: [paths.server.baseDir + '**/*.html'],
  startPath: '/',
  ghostMode: false,
  notify: false,
  reloadDelay: 1000,
  skipUncaughtErrors: true
};

export default browserSync;

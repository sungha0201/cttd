const srcDir = `src`;
const publicDir = `public`;

const paths = {
  basepath: `./${srcDir}`,
  destpath: {
    deploy: `dist/`,
    dev: `.dev-server/`
  },
  server: {
    baseDir: `.dev-server/`
  },
  html: {
    src: [`${srcDir}/**/*.html`, `!${srcDir}/**/_*/**/*`, `!${srcDir}/**/_*`]
  },
  scss: {
    src: [`${srcDir}/**/*.scss`, `!${srcDir}/_*/**/*`, `!${srcDir}/_*`]
  },
  css: {
    src: [`${srcDir}/**/*.css`, `!${srcDir}/**/_*/**/*`, `!${srcDir}/**/_*`]
  },
  js: {
    src: [`${srcDir}/**/*.js`, `!${srcDir}/**/_*/**/*`, `!${srcDir}/_*`]
  },
  image: {
    src: [`${srcDir}/**/*.{png,jpg,jpeg,gif,svg}`, `!${srcDir}/_*/**/*`, `!${srcDir}/_*`]
  },
  font: {
    src: [`${srcDir}/**/*.{eot,ttf,woff,woff2}`, `!${srcDir}/_*/**/*`, `!${srcDir}/_*`]
  },
  json: {
    src: [`${srcDir}/**/*.json`, `!${srcDir}/_*/**/*`, `!${srcDir}/_*`]
  },
  publicImage: {
    src: [`${publicDir}/**/*.{png,jpg,jpeg,gif,svg}`, `!${publicDir}/_*/**/*`, `!${publicDir}/_*`],
    dest: `${publicDir}/`
  },
  publicVideo: {
    src: [`${publicDir}/**/*.{png,jpg,jpeg,gif,svg}`, `!${publicDir}/_*/**/*`, `!${publicDir}/_*`],
    dest: `${publicDir}/`
  }
};

export default paths;

import paths from './config/paths.js';
import del from 'del';

import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const isProduction = process.env.NODE_ENV === 'production';
const dest = isProduction ? paths.destpath.deploy : paths.destpath.dev;

const clean = () => {
  if (process.env.ROOT_CLEAN === 'true') {
    return del(isProduction ? 'dist/' : '.dev-server/');
  } else {
    return del(dest);
  }
};

export default clean;

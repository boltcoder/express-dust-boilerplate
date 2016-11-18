const path = require('path');

/* load environment variables to process.env */
require('dotenv').load();

global.APP_ROOT = path.resolve(`${__dirname}/../`);

global.PORT = process.env.PORT || 80;

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging';

global.__SERVER__ = true;
global.__CLIENT__ = false;

global.APP_LOG_DIR = process.env.APP_LOG_DIR || '/var/log/cnc/';
/* Set app src point to src or build  for using transpiled code
or non transpiled code on the basis of environment */

global.APP_SRC = (__DEVELOPMENT__) ? path.resolve(`${APP_ROOT}/src`) : path.resolve(`${APP_ROOT}/build`);
global.VIEWS_DIR = `${APP_SRC}/views`;
global.appLogger = require(`${APP_SRC}/helpers/utils/appLogger`);

//assets configs
global.assetsHost = process.env.ASSETS_HOST;
global.assetsVersion = process.env.ASSETS_VERSION;
global.CDN = process.env.CDN;
global.ASSETS_FOLDER = process.env.ASSETS_FOLDER;
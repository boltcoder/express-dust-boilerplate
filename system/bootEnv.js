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
global.appLogger = require(`${APP_SRC}/helpers/utils/appLogger`);

/* setup environment */
require('./bootEnv');

/* setup babel transpilation and other configurations */
require('./bootBabel');

/* setup server on the basis of environment,
 either from build folder for production
 or from src folder for development */
require(`${APP_SRC}/server`); // eslint-disable-line import/no-dynamic-require

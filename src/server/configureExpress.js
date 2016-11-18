import cookieParser from 'cookie-parser';
import multipart from 'connect-multiparty';
import bodyParser from 'body-parser';
import accessLogger from '../helpers/utils/httpLogger';
import favicon from 'serve-favicon';
import path from 'path';

export default (app) => {
    /* Use logger for access logs, body parser, favicon serving */
  app.use(

        favicon(path.resolve(`${APP_ROOT}/public/images/favicon.ico`)),
        accessLogger,
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false }),
        cookieParser(),
        multipart(),
        );
  return app;
};


import cookieParser from 'cookie-parser';
import multipart from 'connect-multiparty';
import bodyParser from 'body-parser';
import accessLogger from '../helpers/utils/httpLogger';
import favicon from 'serve-favicon';
import path from 'path';
import consolidate from 'consolidate';
import dust from  'dustjs-linkedin';

export default (app) => {
    /* View path, rendering engine,Use logger for access logs, body parser, favicon serving */
    app.set('x-powered-by', false);
    app.set('etag', false);
    app.engine('dust', consolidate.dust);
    // set .dust as the default extension
    app.set('view engine', 'dust');
    // set view path
    app.set('views', VIEWS_DIR);

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


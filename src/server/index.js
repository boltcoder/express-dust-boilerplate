import { app, proxy } from './bootExpress';
import configureExpress from './configureExpress';
import configureExpressRoutes from './configureExpressRoutes';

configureExpressRoutes(configureExpress(app), proxy);

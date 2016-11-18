import express from 'express';
import path from 'path';
import controllers from '../controllers';

export default (app, proxy) => {

  // serve our static stuff like sitemap.xml
  app.use(express.static(path.join(APP_ROOT, 'public/')));

  // app.use('/redirect.php', bodyParser.json(), (req, res, next) => {
  //   (new controllers.account.Email(req, res, next)).redirectFromEmail();
  // });

  // proxying API calls as it is
  app.use('/api', (req, res, next) => {
    (new controllers.Proxy(req, res, next, proxy)).proxyAll();
  });

  app.get('/', (req,res,next)=>{
    (new controllers.Home(req, res, next)).showHomePage();
  });


  app.get('*', (req,res,next)=> {
    (new controllers.Base(req, res, next)).showSampleOutput();

  });

  // catch errors
  app.use((err, req, res, next) => {
    (new controllers.Base(req, res, next)).show500(err);
  });
  return app;
};

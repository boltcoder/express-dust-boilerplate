export default class BaseController {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }
  /**
  * http redirects
  */
  redirect(url = undefined, errCode = undefined) {
    this.res.set('Location', url);
    this.res.status(errCode || 302).redirect(url || '/');
  }
  /*
   force send json response as custom status
   */
  sendAsXXX(response, xxx) {
    this.res.status(xxx);
    this.res.send(response);
    return;
  }
  /*
    500 error page TODO replace with html
   */
  show500(error) {
    const text = error instanceof Error ? `${error.stack}` : JSON.stringify(error);
    this.res.status(500);
    this.res.send(`Error Occured: \n ${text}`);
    return;
  }

  /**
  * Catch exception thrown by done() method on Promise
  * @param  {Error}  err
  */
  catchFinalError(error) {
    this.logError('ERROR_APP', error);
    this.sendAsXXX('Server Error', 500);
    return;
  }

  showSampleOutput(){
    this.sendAsXXX('SAMPLE APP WORKS',200);
  }

  /* Log Errors*/
  logError(message, error) {
    const metadata = {
      metadata: { err: error, message: error.message, stack: error.stack, request: this.req.originalUrl },
    };
    appLogger.debug(message, metadata);
  }
}

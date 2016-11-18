
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




  setCacheControl() {
    this.res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
    this.res.header('Pragma', 'no-cache');
  }
  addDefaultDataToViewParams(viewParams) {
    viewParams.headerData={};
    viewParams.footerData={};
    viewParams.assetData={};
    viewParams.headerData.title = "SAMPLE APP";
    // todo add common all page javascript
    viewParams.assetData.js=viewParams.js;
    viewParams.assetData.css=viewParams.css;
  }


  render(path, viewParams = {}, status = undefined) {

    this.addDefaultDataToViewParams(viewParams);

    /** Set Cache Control */
    this.setCacheControl();

    if(status)
      this.res.status(status);
    this.res.render(path, viewParams);
  }

  /* Log Errors*/
  logError(message, error) {
    const metadata = {
      metadata: { err: error, message: error.message, stack: error.stack, request: this.req.originalUrl },
    };
    appLogger.debug(message, metadata);
  }



}

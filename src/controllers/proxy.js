/**
 *  Proxy
 */
import BaseController from './base';

export default class ProxyController extends BaseController {
  // Proxy injected
  constructor(req, res, next, proxy) {
    super(req, res, next);
    this.proxy = proxy;
  }

  proxyAll() {
    const updatedRequest = this.req;
    updatedRequest.headers.userIp = this.req.headers['x-forwarded-for'] || this.req.connection.remoteAddress;
    this.proxy.web(updatedRequest, this.res);
  }
}

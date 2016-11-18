import request from 'request';
import Q from 'q';
import _ from 'lodash';
import isObject from 'lodash/isObject';
import fs from 'fs';
import moment from 'moment';
import apiError from './apiError';

/* no need for this as of now */
// const invertedExtensionsType = invertObject(map);
// invertedExtensionsType.__proto__ = null;


const mapExtensionsType = Object.assign(Object.create(null), {
  json: 'application/json',
  text: 'text/plain',
  xml: 'application/xml',
});


export default class ApiCall {
  constructor(options = {}) {
    this.setLogOnOk(false);

    this.setLogFile(options.logFile || 'applicationApiLog')
    .setLogFinder(options.logFinder || 'API')
    .setLogOnOk(options.logOnOk || true)
    .setLogOnErr(options.logOnErr || true)
    .setLogResOnOk(options.logResOk || false)
    .setLogResOnErr(options.logResErr || true)
    .setLogTraceOnOk(options.logTraceOnOk || false)
    .setLogTraceOnErr(options.logTraceOnErr || true)
    .setTimeout(options.timeout)
    .setCustomHeader(options.customHeaders || {});
  }

  handleResponse(error, response, body, promise, requestInfo) {
    if (error) {
      this._logError(error, requestInfo);
      promise.reject(error);
    }
    else if (!error && (response.statusCode === 200 || response.statusCode === 201)) {
      this._logSuccess(body, requestInfo);
      promise.resolve(body);
    } else {

      const errorx = new apiError(response.body, response.statusCode);
      this._logError(errorx, requestInfo);
      promise.reject(errorx);
    }
  }

  prepareOptions(url, data) {
    const headers = {

      'Content-Type': mapExtensionsType.json,
    };
    const options = {
      url,
      timeout: this.timeout,
      headers: _.merge(headers, this.customHeaders),
      json: true,
    };
    return options;
  }

  sendRequest(options, data) {
    // Return promise
    return Q.promise((res, rej) => {
      const startTime = process.hrtime();
      request(options, (error, response, body) => {
        const diff = process.hrtime(startTime);
        const timeTaken = Math.round(((diff[0] * 1e3) + (diff[1] * 1e-6)) * 100) / 100;
        this.handleResponse(error, response, body, { resolve: res, reject: rej }, { url: options.url, data, timeTaken });
      });
    });
  }

  get(url, data = undefined) {
    const options = this.prepareOptions(url, data);
    options.method = 'GET';
    if (data !== undefined) {
      options.qs = data;
    }

    // Return promise
    return this.sendRequest(options, data);
  }

  post(url, data = {}) {
    const options = this.prepareOptions(url, data);
    options.method = 'POST';
    if (data !== undefined) {
      options.body = data;
    }
    // Return promise
    return this.sendRequest(options, data);
  }
  put(url, data = {}) {
    const options = this.prepareOptions(url, data);
    options.method = 'PUT';
    if (data !== undefined) {
      options.body = data;
    }
    // Return promise
    return this.sendRequest(options, data);
  }
  _delete(url, data = {}) {
    const options = this.prepareOptions(url, data);
    options.method = 'DELETE';
    if (data !== undefined) {
      options.body = data;
    }
    // Return promise
    return this.sendRequest(options, data);
  }

  _log(msgArr, requestInfo) {
    const separator = '| ';
    let msg = `${moment().format('Y-m-d H:m:s')}${separator}${this.logFinder}${separator}Time: ${requestInfo.timeTaken}${separator}NODE_PID: ${process.pid}${separator}API URL: ${requestInfo.url}${separator}INPUT: ${JSON.stringify(requestInfo.data)}`;
    if (msgArr.length !== 0) {
      msg = `${msg}${separator}${msgArr.join(separator)}`;
    }
    // put in file async
    fs.appendFile(`${APP_LOG_DIR}${this.logFile}.log`, `${msg}\n`);
  }

  _logSuccess(body, requestInfo) {
    const msgArr = [];
    if (this.logResOk) {
      try {
        msgArr.push(`Response : ${isObject(body) ? JSON.stringify(body) : body}`);
      } catch (e) {}
    }

    if (this.logTraceOnOk) {
      msgArr.push(`Callee : ${(new Error()).stack}`);
    }
    this._log(msgArr, requestInfo);
  }

  _logError(error, requestInfo) {
    const stack = (error instanceof Error) && error.stack || (new Error()).stack;
    const msgArr = [];
    // log error response
    if (this.logResErr) {
      try {
        if (error instanceof Error || isObject(error)) {
          msgArr.push(`ERROR : ${JSON.stringify(error)}`);
        } else {
          msgArr.push(`ERROR : ${error}`);
        }
      } catch (e) {
      }
    }
    // log trace
    if (this.logTraceOnErr) {
      msgArr.push(`Callee : ${error instanceof Error ? error.stack : (new Error()).stack}`);
    }
    this._log(msgArr, requestInfo);
  }

  setLogFile(logFile) { this.logFile = logFile; return this; }
  setLogFinder(logFinder) { this.logFinder = logFinder || 'API'; return this; }
  setLogOnOk(val) { this.logOnOk = !!val; return this; }
  setLogOnErr(val) { this.logOnErr = !!val; return this; }
  setLogResOnOk(val) { this.logResOk = !!val; return this; }
  setLogResOnErr(val) { this.logResErr = !!val; return this; }
  setLogTraceOnOk(val) { this.logTraceOnOk = !!val; return this; }
  setLogTraceOnErr(val) { this.logTraceOnErr = !!val; return this; }
  setTimeout(timeout) { this.timeout = +timeout || 3000; return this; } // todo unhardcode timeout and put it into configurtion
  setCustomHeader(customHeaders) {
    this.customHeaders = customHeaders;
  }
}



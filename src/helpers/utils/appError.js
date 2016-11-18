import extendableBuiltin from './extendableBuiltin';

class AppError extends extendableBuiltin(Error) {
  constructor(message, code = 0, prevErr = undefined, showStack = true) {
    super();
    const isException = message instanceof Error;
    this.message = isException ? message.toString() : message;
    this.code = code;
    this.stack = showStack ? (isException ? message.stack : (new Error()).stack) : ''; //eslint-disable
    this.name = this.constructor.name;
    this.prevErr = prevErr;
    this.logged = (prevErr && prevErr.logged) || false;
  }
}

export default AppError;

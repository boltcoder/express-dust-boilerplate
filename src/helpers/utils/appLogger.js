var winston = require('winston');

let mywinston = new(winston.Logger)({
  transports: [
    new(winston.transports.File)({
      level:'debug',
      name:'debug',
      filename: APP_LOG_DIR + 'debugLogs.log'
    }),
    new(winston.transports.File)({
      name:'test',
      level:'info',
      filename: APP_LOG_DIR + 'testLogs.log'
    }),
  ]
});

if (__DEVELOPMENT__) {
  mywinston.add(winston.transports.Console);
}
module.exports = mywinston;

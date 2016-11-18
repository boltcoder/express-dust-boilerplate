const fs = require('fs');
const morgan = require('morgan');

const accessLogStream = fs.createWriteStream(`${APP_LOG_DIR}/accessLogs.log`, { flags: 'a' });
// loggin http requests
const format = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" "ResponseTime/::response-time[3]"';

export default morgan(format, { stream: accessLogStream });

import express from 'express';
import httpProxy from 'http-proxy';
import config from '../config';

const app = express();

const proxy = httpProxy.createProxyServer({
  target: `http://${config.apiHost}:${config.apiPort}`,
});

// HTTP
app.listen(PORT, () => {
  console.log(`Express server running at localhost: ${PORT}`);
});

proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, { 'content-type': 'application/json' });
  }
  console.log('PROXY ERROR IS ', error);
  json = { error: 'proxy_error', reason: error.message }; //eslint-disable-line
  res.end(JSON.stringify(json));
});

module.exports = { app, proxy };

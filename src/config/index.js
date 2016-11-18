
/*
    ALL CONFIGURABLE ENUMS HERE
 */
export default {
  apiProto: process.env.API_PROTO || 'http',
  apiHost: process.env.API_HOST,
  apiPort: process.env.API_PORT,
  assetsHost: process.env.ASSETS_HOST,
  assetsVersion: process.env.ASSETS_VERSION
};

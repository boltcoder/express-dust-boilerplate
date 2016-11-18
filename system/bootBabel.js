/* using on-the-fly transpilation in development mode . Check .babelrc for settings */
if (__DEVELOPMENT__) {
  require('babel-register');
}
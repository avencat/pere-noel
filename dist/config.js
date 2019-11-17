"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const env = process.env.NODE_ENV || 'development';
const defaultConfig = {
  port: process.env.PORT || 3000,
  root: '../',
  srcPath: 'src',
  isDev: env === 'development',
  env,
  api: {
    version: '1',
    secret: 'J4JkJBHBqYh2Aa,#u6}[G=W3yZ}(VR'
  }
};
const config = {
  development: { ...defaultConfig,
    db: process.env.DATABASE_URL
  },
  production: { ...defaultConfig,
    srcPath: 'dist',
    db: process.env.DATABASE_URL
  }
};
var _default = config[env];
exports.default = _default;
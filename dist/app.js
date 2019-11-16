"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _config = _interopRequireDefault(require("./config"));

var _bootstrap = _interopRequireDefault(require("./bootstrap"));

const app = (0, _bootstrap.default)((0, _express.default)(), _config.default);
app.listen(_config.default.port, () => {
  _config.default.isDev && console.info(`Express server listening on port ${_config.default.port}`);
});
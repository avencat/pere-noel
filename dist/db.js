"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pg = require("pg");

var _config = _interopRequireDefault(require("./config"));

var _default = new _pg.Client({
  connectionString: _config.default.db,
  ssl: true
});

exports.default = _default;
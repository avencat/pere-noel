"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

function scope(prefix) {
  const {
    api: {
      version
    }
  } = _config.default;
  return `/api/v${version}/${prefix}`;
}

function success(res) {
  return payload => res.send({
    success: true,
    data: { ...payload
    }
  });
}

function error(res) {
  return payload => res.send({
    success: false,
    data: { ...payload
    }
  });
}

const api = {
  scope,
  success,
  error
};
var _default = api;
exports.default = _default;
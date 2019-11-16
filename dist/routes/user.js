"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _api = _interopRequireDefault(require("../infrastructure/api"));

var _user = require("../controllers/user");

const router = _express.default.Router();

var _default = app => {
  app.use(_api.default.scope('user'), router);
  router.post('/', _user.createUser);
  router.delete('/:id', _user.removeUser);
  router.patch('/:id', _user.updateUser);
  router.get('/:id', _user.getUser);
};

exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _glob = _interopRequireDefault(require("glob"));

var _db = _interopRequireDefault(require("./db"));

function loadProject(app, config) {
  const controllers = _glob.default.sync('routes/*.js');

  controllers.forEach(file => require(`${config.root}${file}`).default(app));
}

function init(app, config) {
  app.use((0, _cors.default)());
  app.use((0, _compression.default)());
  app.use(_bodyParser.default.json());
  app.use(_bodyParser.default.urlencoded({
    extended: true
  }));

  try {
    _db.default.connect();
    /* files loader */


    loadProject(app, config);
  } catch (e) {
    config.isDev && console.log(e);
  }

  return app;
}

var _default = init;
exports.default = _default;
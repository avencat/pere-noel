"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.removeUser = exports.getUser = exports.createUser = void 0;

var _db = _interopRequireDefault(require("../db"));

var _config = _interopRequireDefault(require("../config"));

var _api = _interopRequireDefault(require("../infrastructure/api"));

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      biography,
      email,
      sex,
      age,
      profilePicture
    } = req.body;
    const {
      rows: [user]
    } = await _db.default.query(`
      INSERT INTO
       users(
         firstName,
         lastName,
         biography,
         email,
         sex,
         age,
         profilePicture,
         isRemoved
       )
       VALUES($1, $2, $3, $4, $5, $6, $7, FALSE) RETURNING *
    `, [firstName, lastName, biography, email, sex, age, profilePicture]);
    return _api.default.success(res)(user);
  } catch (e) {
    _config.default.isDev && console.error(e);
    return _api.default.error(res)({
      code: 2,
      message: 'Bad request'
    });
  }
};

exports.createUser = createUser;

const getUser = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    const user = await _db.default.query('SELECT * FROM users WHERE id = $1', [id]);
    return _api.default.success(res)({ ...user.toJSON()
    });
  } catch (e) {
    _config.default.isDev && console.error(e);
    return _api.default.error(res)({
      code: 1,
      message: 'User not found'
    });
  }
};

exports.getUser = getUser;

const removeUser = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    await _db.default.query('UPDATE users SET isRemoved = true WHERE id = $1', [id]);
    return _api.default.success(res)({});
  } catch (e) {
    _config.default.isDev && console.error(e);
    return _api.default.error(res)({
      code: 1,
      message: 'User not found'
    });
  }
};

exports.removeUser = removeUser;

const updateUser = async (req, res) => {
  const {
    id
  } = req.params;

  try {
    await _db.default.query(`
      UPDATE users
      SET biography = COALESCE($1, biography), profilePicture = COALESCE($2, profilePicture)
      WHERE id = $1 RETURNING *
    `, [id]);
    return _api.default.success(res)({});
  } catch (e) {
    _config.default.isDev && console.error(e);
    return _api.default.error(res)({
      code: 1,
      message: 'User not found'
    });
  }
};

exports.updateUser = updateUser;
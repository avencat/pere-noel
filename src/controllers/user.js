import client from '../db';
import config from '../config';
import api from '../infrastructure/api';

const createUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      biography,
      email,
      sex,
      age,
      profilePicture,
    } = req.body;

    const { rows: [user] } = await client.query(`
      INSERT INTO
       users(
         first_name,
         last_name,
         biography,
         email,
         sex,
         age,
         profile_picture,
         is_removed
       )
       VALUES($1, $2, $3, $4, $5, $6, $7, FALSE) RETURNING *
    `, [firstName, lastName, biography, email, sex, age, profilePicture]);

    return api.success(res)(user);
  } catch (e) {
    config.isDev && console.error(e);

    return api.error(res)({
      code: 2,
      message: 'Bad request',
      column: e.column,
    });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await client.query('SELECT * FROM users WHERE id = $1', [id]);

    return api.success(res)({ ...user.toJSON() });
  } catch (e) {
    config.isDev && console.error(e);

    return api.error(res)({
      code: 1,
      message: 'User not found',
    });
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('UPDATE users SET is_removed = true WHERE id = $1', [id]);

    return api.success(res)({});
  } catch (e) {
    config.isDev && console.error(e);

    return api.error(res)({
      code: 1,
      message: 'User not found',
    });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query(`
      UPDATE users
      SET biography = COALESCE($1, biography), profile_picture = COALESCE($2, profile_picture)
      WHERE id = $1 RETURNING *
    `, [id]);

    return api.success(res)({});
  } catch (e) {
    config.isDev && console.error(e);

    return api.error(res)({
      code: 1,
      message: 'User not found',
    });
  }
};

export {
  createUser,
  getUser,
  removeUser,
  updateUser,
};

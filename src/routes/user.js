import express from 'express';

import api from '../infrastructure/api';
import {
  createUser, getUser, removeUser, updateUser,
} from '../controllers/user';

const router = express.Router();

export default app => {
  app.use(api.scope('user'), router);

  router.post('/', createUser);

  router.delete('/:id', removeUser);

  router.patch('/:id', updateUser);

  router.get('/:id', getUser);
};

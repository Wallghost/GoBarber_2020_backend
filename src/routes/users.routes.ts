import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/uploadMulterConfig';

import ensureAuth from '../middleware/ensureAuthenticate';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();
const upload = multer(multerConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuth,
  upload.single('avatar'),
  async (request, response) => {
    response.json({ ok: true });
  },
);

export default usersRouter;
